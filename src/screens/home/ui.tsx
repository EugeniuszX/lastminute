import React, { useCallback, useMemo, useState } from "react"
import { useTheme } from "styled-components/native"

import { useHotels } from "../../entities/hotel"
import type { FilterOptions } from "../../features/filter-hotels"
import { FilterHotels } from "../../features/filter-hotels"
import type { SortOption, SortOrder } from "../../features/sort-hotels"
import { SortHotels } from "../../features/sort-hotels"
import { WithSafeArea } from "../../shared/ui"
import { HotelsList, ListHeader } from "../../widgets/hotels-list"

export const HomeScreen: React.FC = () => {
  const { data } = useHotels()
  const [isOpenSortModal, setIsOpenSortModal] = useState(false)
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false)
  const theme = useTheme()
  const [sortOption, setSortOption] = useState<SortOption>()
  const [sortOrder, setSortOrder] = useState<SortOrder>()
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({})

  const handleSort = useCallback((option: SortOption, order: SortOrder) => {
    setSortOption(option)
    setSortOrder(order)
  }, [])

  const filteredAndSortedHotels = useMemo(() => {
    if (!data) return undefined

    let result = [...data]

    if (filterOptions.minPrice) {
      result = result.filter((hotel) => hotel.price >= filterOptions.minPrice!)
    }
    if (filterOptions.maxPrice) {
      result = result.filter((hotel) => hotel.price <= filterOptions.maxPrice!)
    }
    if (filterOptions.minRating) {
      result = result.filter(
        (hotel) => hotel.userRating >= filterOptions.minRating!,
      )
    }

    if (sortOption && sortOrder) {
      result.sort((a, b) => {
        const valueA = sortOption === "price" ? a.price : a.userRating
        const valueB = sortOption === "price" ? b.price : b.userRating
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA
      })
    }

    return result
  }, [
    data,
    filterOptions.minPrice,
    filterOptions.maxPrice,
    filterOptions.minRating,
    sortOption,
    sortOrder,
  ])

  const toggleSortModal = () => {
    setIsOpenSortModal(!isOpenSortModal)
  }

  const toggleFilterModal = () => {
    setIsOpenFilterModal(!isOpenFilterModal)
  }

  return (
    <WithSafeArea color={theme.surface}>
      <HotelsList
        data={filteredAndSortedHotels}
        headerComponent={
          data?.length ? (
            <ListHeader
              onPressFilter={toggleFilterModal}
              onPressSort={toggleSortModal}
            />
          ) : undefined
        }
      />
      {isOpenSortModal && (
        <SortHotels
          selectedOption={sortOption}
          selectedOrder={sortOrder}
          onSelect={handleSort}
          onClose={toggleSortModal}
        />
      )}
      {isOpenFilterModal && (
        <FilterHotels
          onApply={setFilterOptions}
          options={filterOptions}
          onClose={toggleFilterModal}
        />
      )}
    </WithSafeArea>
  )
}
