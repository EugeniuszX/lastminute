import React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "styled-components/native"

export const StaticHeart: React.FC = () => {
  const theme = useTheme()
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
      <Path
        d="M6.875 3.667a5.042 5.042 0 00-5.042 5.042c0 5.041 5.959 9.625 9.167 10.69 3.208-1.065 9.167-5.649 9.167-10.69A5.042 5.042 0 0011 5.809a5.036 5.036 0 00-4.125-2.142z"
        stroke={theme.border}
        strokeWidth={0.5}
        fill={theme.secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
