import { MMKV } from "react-native-mmkv"
import type { StoreApi, UseBoundStore } from "zustand"

export const mmkv = new MMKV()

export const storage = {
  setItem<T>(key: string, value: T) {
    mmkv.set(key, JSON.stringify(value))
  },
  getItem<T>(key: string): T | null {
    const value = mmkv.getString(key)
    return value ? (JSON.parse(value) as T) || null : null
  },
  removeItem(key: string) {
    mmkv.delete(key)
  },
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = Object.keys(store.getState()).reduce(
    (acc: Record<string, () => never>, k) => {
      acc[k] = () => store((s) => s[k as keyof typeof s])
      return acc
    },
    {},
  )

  return store
}
