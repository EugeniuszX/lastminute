const { getDefaultConfig } = require("@react-native/metro-config")
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config")

const defaultConfig = getDefaultConfig(__dirname)

const config = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  },
}

module.exports = wrapWithReanimatedMetroConfig(config)
