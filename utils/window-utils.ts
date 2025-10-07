// Window utilities for safe SSR access

export const isClient = () => typeof window !== 'undefined';

export const getWindowWidth = () => {
  if (!isClient()) return 1920; // Default width for SSR
  return window.innerWidth;
};

export const getWindowHeight = () => {
  if (!isClient()) return 1080; // Default height for SSR
  return window.innerHeight;
};

export const isMobile = () => {
  if (!isClient()) return false;
  return window.innerWidth < 768;
};

export const safeWindow = () => isClient() ? window : undefined;
