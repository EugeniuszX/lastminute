module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
        blocklist: null,
        allowlist: null,
        safe: false,
        verbose: false,
        allowUndefined: true,
      },
    ],
    "react-native-boost/plugin",
    "react-native-reanimated/plugin",
  ],
}
