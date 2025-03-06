import * as React from "react"
import { Pressable } from "react-native"
import ReactNativeHapticFeedback from "react-native-haptic-feedback"
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "styled-components/native"

interface HeartIconProps {
  width?: number
  height?: number
  isFavorite: Animated.SharedValue<number>
  callback: () => void
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const HeartIcon: React.FC<HeartIconProps> = (props) => {
  const { isFavorite, width, height, callback } = props

  const theme = useTheme()

  const scale = useSharedValue(1)
  const animatedStylesProps = useAnimatedProps(() => {
    const fill = interpolateColor(
      isFavorite.value,
      [0, 1],
      [theme.secondary, theme.primary],
      "RGB",
    )

    const stroke = interpolateColor(
      isFavorite.value,
      [0, 1],
      ["#E2E0E0", theme.primary],
      "RGB",
    )

    return { fill, stroke }
  })

  const heartAnimatedStyles = useAnimatedProps(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const handleStartAnimation = () => {
    "worklet"

    const isActive = isFavorite.value === 1 ? 0 : 1

    isFavorite.value = withTiming(isActive, { duration: 300 })
    scale.value = withSpring(1.2, {}, (isFinished) => {
      if (isFinished) {
        scale.value = withSpring(1)
      }
    })
  }

  const handlePressHeart = () => {
    ReactNativeHapticFeedback.trigger("impactLight", {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    })

    handleStartAnimation()
    callback()
  }

  return (
    <Pressable onPress={handlePressHeart}>
      <Animated.View style={[heartAnimatedStyles]}>
        <Svg
          width={width ?? 22}
          height={height ?? 22}
          viewBox="0 0 22 22"
          fill="none"
        >
          <AnimatedPath
            d="M6.875 3.667a5.042 5.042 0 00-5.042 5.042c0 5.041 5.959 9.625 9.167 10.69 3.208-1.065 9.167-5.649 9.167-10.69A5.042 5.042 0 0011 5.809a5.036 5.036 0 00-4.125-2.142z"
            animatedProps={animatedStylesProps}
            strokeWidth={0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </Pressable>
  )
}
