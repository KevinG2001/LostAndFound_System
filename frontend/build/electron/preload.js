"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// electron/preload.ts
var electron_1 = require("electron");
// Expose protected methods that allow the renderer process to communicate with the main process
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    send: function (channel, data) {
        // Allowed channels
        var validChannels = ["toMain"];
        if (validChannels.includes(channel)) {
            electron_1.ipcRenderer.send(channel, data);
        }
    },
    receive: function (channel, func) {
        var validChannels = ["fromMain"];
        if (validChannels.includes(channel)) {
            // Remove any default listener for that channel before attaching the new one
            electron_1.ipcRenderer.removeAllListeners(channel);
            electron_1.ipcRenderer.on(channel, function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                return func.apply(void 0, args);
            });
        }
    },
});
