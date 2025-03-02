import React from "react"

import { useHotels } from "../../entities/hotel"
import { WithSafeArea } from "../../shared/ui"
import { HotelsList } from "../../widgets/hotels-list"

export const HomeScreen: React.FC = () => {
  const { data, isLoading } = useHotels()

  console.log("data", data)

  return (
    <WithSafeArea>
      <HotelsList data={data} isLoading={isLoading} />
    </WithSafeArea>
  )
}
