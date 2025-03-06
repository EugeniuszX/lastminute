import React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "styled-components/native"

export const FilterIcon = () => {
  const theme = useTheme()
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.4 4.8H12M2.4 12H12m0 0v2.4m0-2.4V9.6m-9.6 9.6h4.8m4.8 0h9.6M16.8 12h4.8m-4.8-7.2h4.8m-4.8 0v2.4m0-2.4V2.4m-9 19.2v-4.8"
        stroke={theme.secondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
