import "styled-components/native"

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {
    primary: string
    secondary: string
    background: string
    surface: string
    textPrimary: string
    textSecondary: string
    textTertiary: string
    border: string
    divider: string
    success: string
    error: string
    warning: string
    buttonPrimary: string
    buttonSecondary: string
    buttonDisabled: string
  }
}
