const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  packagerConfig: {
    executableName: "TrackItDown",
    name: "TrackItDown",
    electronMain: "electron/main.js",
    asar: true,
    files: ["dist/", "build/electron/", "electron/", "package.json"],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "TrackItDown",
        authors: "Kevin Glennon",
        description: "Application for tracking lost property",
        exe: "TrackItDown.exe",
        setupExe: "TrackItDown-Setup.exe",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          name: "trackitdown",
          productName: "TrackItDown",
          maintainer: "Kevin Glennon",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        options: {
          name: "trackitdown",
          productName: "TrackItDown",
          maintainer: "Kevin Glennon",
        },
      },
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
