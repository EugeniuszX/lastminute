import React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "styled-components/native"

export const SortIcon = () => {
  const theme = useTheme()
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.4 6L18 2.4m0 0L21.6 6M18 2.4v19.2M9.6 18L6 21.6m0 0L2.4 18M6 21.6V2.4"
        stroke={theme.secondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
