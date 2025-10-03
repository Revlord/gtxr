var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
import { createRequire } from "module";
import {
  addFirstSlash,
  getDefineByMode,
  getDefineXrEnvBase,
  getEnv,
  getFinalBase,
  getFinalOutdir,
  getJSXAliasByMode,
  getReactSDKAliasByMode
} from "@webspatial/shared";
function withWebspatial(options = {}) {
  const mode = options.mode ?? getEnv();
  const outputDir = options.outputDir;
  return (config) => {
    const distDir = config?.distDir ?? ".next";
    const basePath = config?.basePath;
    const finalBasePath = addFirstSlash(getFinalBase(basePath, mode, outputDir));
    const finalDistDir = getFinalOutdir(distDir, mode, outputDir);
    const finalConfig = {
      ...config,
      experimental: {
        turbo: {
          root: "..",
          // https://github.com/vercel/next.js/issues/71886
          resolveAlias: {
            ...getJSXAliasByMode(mode),
            ...getReactSDKAliasByMode(mode)
          }
        }
      },
      webpack: (webpackConfig, context) => {
        let modifiedConfig = webpackConfig;
        const require = createRequire(import.meta.url);
        const webpack = require("webpack");
        const { DefinePlugin } = webpack; 
        if (config && typeof config.webpack === "function") {
          modifiedConfig = config.webpack(modifiedConfig, context);
        }
        modifiedConfig.plugins = modifiedConfig.plugins || [];
        modifiedConfig.plugins.push(
          new DefinePlugin({
            ...getDefineByMode(mode),
            ...getDefineXrEnvBase(finalBasePath)
          })
        );
        if (context.dev) {
          modifiedConfig.plugins.push(
            new PrintDevInfoPlugin({ mode, finalBasePath, finalDistDir })
          );
        }
        modifiedConfig.plugins.push(new ModifyResolveConditionNamesPlugin());
        modifiedConfig.resolve = modifiedConfig.resolve || {};
        modifiedConfig.resolve.alias = {
          ...modifiedConfig.resolve.alias || {},
          ...getJSXAliasByMode(mode),
          ...getReactSDKAliasByMode(mode)
        };
        return modifiedConfig;
      },
      distDir: finalDistDir,
      basePath: finalBasePath
    };
    return finalConfig;
  };
}
var ModifyResolveConditionNamesPlugin = class {
  apply(compiler) {
    compiler.hooks.afterEnvironment.tap(
      "ModifyResolveConditionNamesPlugin",
      () => {
        const isServer = compiler.options.name !== "client";
        if (isServer) {
          compiler.options.resolve.conditionNames = [
            "react-server",
            ...compiler.options.resolve.conditionNames || []
          ];
        }
      }
    );
  }
};
var _PrintDevInfoPlugin = class _PrintDevInfoPlugin {
  constructor(props) {
    __publicField(this, "finalBasePath");
    __publicField(this, "finalDistDir");
    __publicField(this, "mode");
    this.finalBasePath = props.finalBasePath;
    this.finalDistDir = props.finalDistDir;
    this.mode = props.mode;
  }
  apply(compiler) {
    compiler.hooks.done.tap("WebspatialURLPlugin", () => {
      if (compiler.options.name === "client" && !_PrintDevInfoPlugin.hasPrinted) {
        console.log("[WebSpatialNextjsPlugin]  mode:", this.mode);
        console.log(
          "[WebSpatialNextjsPlugin] finalBasePath:",
          this.finalBasePath
        );
        console.log("[WebSpatialNextjsPlugin] finalDistDir:", this.finalDistDir);
        let port = process.env.PORT ? Number(process.env.PORT) : 3e3;
        const argv = process.argv;
        const idx = argv.findIndex((v) => v === "-p" || v === "--port");
        if (idx !== -1 && argv[idx + 1]) {
          port = Number(argv[idx + 1]);
        }
        console.log(
          `[WebSpatialNextjsPlugin] > Dev URL: http://localhost:${port}${this.finalBasePath}`
        );
        _PrintDevInfoPlugin.hasPrinted = true;
      }
    });
  }
};
__publicField(_PrintDevInfoPlugin, "hasPrinted", false);
var PrintDevInfoPlugin = _PrintDevInfoPlugin;
export {
  withWebspatial as default
};
//# sourceMappingURL=index.js.map