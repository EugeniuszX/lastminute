import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

import { HomeScreen } from "./home"
import { HotelScreen } from "./hotel"

const Stack = createNativeStackNavigator<RootStackListType>()

type RootStackListType = {
  Home: undefined
  Hotel: undefined
}

export const Routing: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Hotel" component={HotelScreen} />
    </Stack.Navigator>
  )
}
