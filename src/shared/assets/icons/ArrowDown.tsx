import React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "styled-components/native"

export const ArrowDown: React.FC = () => {
  const theme = useTheme()
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 15.2l-3 3m0 0l-3-3m3 3V6"
        stroke={theme.secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
