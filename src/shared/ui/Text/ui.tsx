import React from "react"
import type { TextProps } from "react-native"
import { Text as RNText } from "react-native"
import styled from "styled-components/native"

type TextVariant = "primary" | "secondary" | "tertiary"

interface ITextProps extends TextProps {
  variant?: TextVariant
}

export const Text: React.FC<ITextProps> = ({
  variant = "primary",
  style,
  ...props
}) => {
  return <StyledText variant={variant} style={style} {...props} />
}

const StyledText = styled(RNText)<{
  variant: TextVariant
}>`
  color: ${({ theme, variant }) => {
    switch (variant) {
      case "secondary":
        return theme.textSecondary
      case "tertiary":
        return theme.textTertiary
      default:
        return theme.textPrimary
    }
  }};
`
