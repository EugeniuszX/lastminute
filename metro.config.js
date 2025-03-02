const { getDefaultConfig } = require("@react-native/metro-config")
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config")

const config = {}

module.exports = wrapWithReanimatedMetroConfig(
  getDefaultConfig(__dirname),
  config,
)
