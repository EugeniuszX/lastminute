import React, { useState } from "react"

import { useHotels } from "../../entities/hotel"
import { SortHotels } from "../../features/sort-hotels"
import { WithSafeArea } from "../../shared/ui"
import { HotelsList, ListHeader } from "../../widgets/hotels-list"

export const HomeScreen: React.FC = () => {
  const { data } = useHotels()
  const [isOpenSortModal, setIsOpenSortModal] = useState(false)
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)

  const toggleSortModal = () => {
    setIsOpenSortModal(!isOpenSortModal)
  }

  const toggleFilterModal = () => {
    setIsOpenFilterModal(!isOpenFilterModal)
  }

  return (
    <WithSafeArea>
      <HotelsList
        data={data}
        headerComponent={
          <ListHeader
            onPressFilter={toggleFilterModal}
            onPressSort={toggleSortModal}
          />
        }
      />
      {isOpenSortModal && (
        <SortHotels onSelect={() => {}} onClose={toggleSortModal} />
      )}
    </WithSafeArea>
  )
}
