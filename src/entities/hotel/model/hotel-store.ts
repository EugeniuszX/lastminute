import { create } from "zustand"
import { persist } from "zustand/middleware"

import { createSelectors, storage } from "../../../shared/lib"
import type { Hotel } from ".."

interface HotelState {
  favorites: Hotel[] | undefined
  setFavorites: (hotels: Hotel) => void
  isFavorite: (id: number) => boolean
}

export const useHotelStore = createSelectors(
  create<HotelState>()(
    persist(
      (set, get) => ({
        favorites: undefined,
        setFavorites: (hotel) => {
          const favorites = get().favorites
          if (favorites) {
            const index = favorites.findIndex((h) => h.id === hotel.id)
            if (index === -1) {
              set({ favorites: [...favorites, hotel] })
            } else {
              const result = favorites.filter((item) => item.id !== hotel.id)
              set({ favorites: result })
            }
          } else {
            set({ favorites: [hotel] })
          }
        },
        isFavorite: (id) => {
          const favorites = get().favorites

          if (favorites) {
            return favorites.some((item) => item.id === id)
          }
          return false
        },
      }),
      {
        name: "hotel",
        storage: storage,
      },
    ),
  ),
)
