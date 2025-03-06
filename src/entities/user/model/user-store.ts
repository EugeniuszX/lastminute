import { create } from "zustand"
import { persist } from "zustand/middleware"

import { createSelectors, storage } from "../../../shared/lib"
import type { Hotel } from "../../hotel"

interface AuthState {
  favorites: Hotel[] | null
  setFavorites: (hotels: Hotel) => void
  isFavorite: (id: number) => boolean
}

export const useUserStore = createSelectors(
  create<AuthState>()(
    persist(
      (set, get) => ({
        favorites: null,
        setFavorites: (hotel) => {
          const favorites = get().favorites
          if (favorites) {
            const index = favorites.findIndex((h) => h.id === hotel.id)
            if (index === -1) {
              set({ favorites: [...favorites, hotel] })
            } else {
              const result = favorites.slice(index, 1)
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
        name: "user",
        storage: storage,
      },
    ),
  ),
)
