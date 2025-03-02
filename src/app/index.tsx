import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect } from "react"
import BootSplash from "react-native-bootsplash"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { Routing } from "../screens"
import { QueryProvider } from "./providers"

export const App: React.FC = () => {
  useEffect(() => {
    void BootSplash.hide({ fade: true })
  }, [])

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <NavigationContainer>
          <Routing />
        </NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  )
}
