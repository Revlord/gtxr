# Vision Pro Simulator Setup Guide for GTXR

## Prerequisites

### 1. Install Xcode and visionOS Support
1. Install **Xcode** from the Mac App Store (version 15.0 or later)
2. Launch Xcode and accept all licenses
3. Go to **Xcode → Settings → Platforms**
4. Download and install **visionOS** platform support
5. Ensure **Command Line Tools** are installed:
   ```bash
   xcode-select --install
   ```

### 2. Verify Simulator Installation
1. Open **Simulator** app (found in `/Applications/Xcode.app/Contents/Developer/Applications/`)
2. Go to **File → Open Simulator** and verify "Apple Vision Pro" is available
3. If not visible, go to **Xcode → Window → Devices and Simulators** and add a visionOS simulator

### 3. Enable Safari Developer Tools
1. Open **Safari** on your Mac
2. Go to **Safari → Settings → Advanced**
3. Enable "Show features for web developers"
4. This allows debugging the spatial app via Web Inspector

## Project Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env.local

# Edit .env.local with your configuration
# For local development, the defaults should work
```

### 3. Verify WebSpatial Configuration
The project is already configured with:
- ✅ WebSpatial SDK packages installed
- ✅ `manifest.webmanifest` with XR scene configuration
- ✅ Custom Next.js plugin for WebSpatial integration
- ✅ TypeScript configured with WebSpatial JSX runtime

## Running in Vision Pro Simulator

### Step 1: Start Development Servers

You need TWO terminal windows running simultaneously:

**Terminal 1 - Normal Mode (Desktop/Mobile)**
```bash
npm run dev
```
This runs on http://localhost:3000

**Terminal 2 - Spatial Mode (XR/Vision Pro)**
```bash
npm run dev:avp
```
This runs on http://localhost:3000/webspatial/avp

⚠️ **Important**: Keep both servers running during development!

### Step 2: Launch in Simulator

**Terminal 3 - Package and Run**
```bash
npm run run:avp
```

This command:
1. Packages your spatial web app into a visionOS app shell
2. Automatically launches the Vision Pro simulator
3. Installs and runs the app in the simulator
4. Connects to your spatial dev server for live updates

### Step 3: Interact with the App

Once the simulator launches:
- The app appears as a spatial window in the visionOS environment
- Use your Mac's mouse/trackpad to simulate spatial input
- Click and drag to look around
- Click on UI elements to interact

## Debugging

### Using Safari Web Inspector

1. With the app running in simulator, open **Safari** on your Mac
2. Go to **Develop** menu
3. Look for **Apple Vision Pro (Simulator)**
4. Select your page to open Web Inspector
5. You can now:
   - Inspect DOM elements
   - View console logs
   - Debug JavaScript
   - Monitor network requests
   - Modify CSS in real-time

### Common Issues and Solutions

#### App Shows Blank Screen
```bash
# Solution: Delete app from simulator and rebuild
# 1. In simulator, long-press the app icon and delete it
# 2. Quit the simulator completely
# 3. Clear Next.js cache:
rm -rf .next
# 4. Re-run the app:
npm run run:avp
```

#### Simulator Not Found
```bash
# Ensure Xcode command line tools are set correctly
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

#### Port Already in Use
```bash
# Kill processes on port 3000
lsof -ti:3000 | xargs kill -9
```

#### Hot Reload Not Working
- Ensure both dev servers are running
- Check that `XR_ENV=avp` is set in the spatial server
- Try refreshing the app in simulator (Cmd+R)

## Building for Production

### 1. Build the Spatial Version
```bash
npm run build:avp
```

### 2. Package for TestFlight
```bash
# Set your Apple Developer credentials in .env.local first
npm run package:avp
```

### 3. Publish to App Store Connect
```bash
npm run publish:avp
```

## Project Structure

```
gtxr/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   └── provider.tsx       # Theme and Spatial providers
├── components/            # React components
├── public/
│   └── manifest.webmanifest  # XR scene configuration
├── next-plugin/
│   └── withWebspatial.mjs    # WebSpatial Next.js plugin
├── next.config.mjs        # Next.js configuration
└── tsconfig.json          # TypeScript config with WebSpatial JSX
```

## Tips for Development

1. **Performance**: The simulator can be resource-intensive. Close unnecessary apps for better performance.

2. **Scene Size**: The default scene size is set to 1400x1000px in `manifest.webmanifest`. Adjust if needed:
   ```json
   "xr_main_scene": {
     "default_size": {
       "width": 1400,
       "height": 1000
     }
   }
   ```

3. **Spatial UI Best Practices**:
   - Use larger touch targets (minimum 44x44px)
   - Ensure good contrast for readability
   - Test interactions at different distances
   - Consider depth and layering for 3D effects

4. **Testing Workflow**:
   - Make changes in your code
   - Save files (hot reload should update the simulator)
   - If changes don't appear, refresh the app in simulator
   - For major changes, restart the `run:avp` command

## Next Steps

1. Test all interactive elements in the spatial environment
2. Optimize performance for spatial rendering
3. Add spatial-specific features using WebSpatial APIs
4. Prepare app metadata for App Store submission
5. Test on real Vision Pro hardware when available

## Resources

- [WebSpatial Documentation](https://webspatial.dev)
- [Apple visionOS Documentation](https://developer.apple.com/visionos/)
- [Next.js Documentation](https://nextjs.org/docs)
- [GTXR Website](https://www.gtxr.club)

## Support

For issues specific to this project, please contact the GTXR development team or open an issue in the project repository.
