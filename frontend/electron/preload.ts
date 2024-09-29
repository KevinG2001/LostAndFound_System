// electron/preload.ts
import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to communicate with the main process
contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel: string, data: any) => {
    // Allowed channels
    const validChannels = ["toMain"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: (...args: any[]) => void) => {
    const validChannels = ["fromMain"];
    if (validChannels.includes(channel)) {
      // Remove any default listener for that channel before attaching the new one
      ipcRenderer.removeAllListeners(channel);
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
