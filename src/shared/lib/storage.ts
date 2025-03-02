import { MMKV } from "react-native-mmkv"

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
