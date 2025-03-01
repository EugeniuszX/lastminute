import React, { useEffect } from "react"
import { Text, View } from "react-native"
import BootSplash from "react-native-bootsplash"

function App(): React.JSX.Element {
  useEffect(() => {
    void BootSplash.hide({ fade: true })
  }, [])

  return (
    <View>
      <Text>Hello</Text>
    </View>
  )
}

export default App
