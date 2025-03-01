import React, { useEffect } from "react"
import { SafeAreaView, Text, View } from "react-native"
import BootSplash from "react-native-bootsplash"

export const App: React.FC = () => {
  useEffect(() => {
    void BootSplash.hide({ fade: true })
  }, [])

  return (
    <SafeAreaView>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  )
}
