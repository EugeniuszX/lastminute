import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import BootSplash from "react-native-bootsplash"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { ThemeProvider } from "styled-components/native"

import { Routing } from "../screens"
import { darkTheme, lightTheme } from "../shared/config"
import { QueryProvider } from "./providers"

export const App: React.FC = () => {
  const colorScheme = useColorScheme()
  const theme = colorScheme === "dark" ? darkTheme : lightTheme

  useEffect(() => {
    void BootSplash.hide({ fade: true })
  }, [])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryProvider>
          <NavigationContainer>
            <ThemeProvider theme={theme}>
              <Routing />
            </ThemeProvider>
          </NavigationContainer>
        </QueryProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
