import "styled-components/native"

type Theme = {
  primary: string
  secondary: string
}

declare module "styled-components/native" {
  export interface DefaultTheme extends Theme {
    primary: string
    secondary: string
  }
}
