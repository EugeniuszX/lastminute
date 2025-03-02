import { NavigationContainer } from "@react-navigation/native"
import React, { useEffect } from "react"
import { SafeAreaView, Text, View } from "react-native"
import BootSplash from "react-native-bootsplash"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { QueryProvider } from "./providers"

export const App: React.FC = () => {
  useEffect(() => {
    void BootSplash.hide({ fade: true })
  }, [])

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <NavigationContainer>
          <SafeAreaView>
            <View>
              <Text>Hello</Text>
            </View>
          </SafeAreaView>
        </NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  )
}
