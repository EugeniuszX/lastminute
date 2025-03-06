import React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "styled-components/native"

export const ArrowUp: React.FC = () => {
  const theme = useTheme()
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 8.8l3-3m0 0l3 3m-3-3V18"
        stroke={theme.secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
