import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

import type { Hotel } from "../entities/hotel"
import { FavoritesScreen } from "./favorites"
import { HomeScreen } from "./home"
import { HotelDetailsScreen } from "./hotel-details"

const Stack = createNativeStackNavigator<RootStackListType>()

export type RootStackListType = {
  Home: undefined
  HotelDetails: { data: Hotel }
  Favorites: undefined
}

export const Routing: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="HotelDetails"
        component={HotelDetailsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Favorites"
        component={FavoritesScreen}
      />
    </Stack.Navigator>
  )
}
