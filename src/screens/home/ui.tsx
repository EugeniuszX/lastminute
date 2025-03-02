import React from "react"
import { Text, View } from "react-native"

import { useHotels } from "../../entities/hotel"
import { WithSafeArea } from "../../shared/ui/WithSafeArea/ui"

export const HomeScreen: React.FC = () => {
  const { data } = useHotels()

  console.log("data", data)

  return (
    <WithSafeArea>
      <View>
        <Text>Home</Text>
      </View>
    </WithSafeArea>
  )
}
