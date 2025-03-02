import NetInfo from "@react-native-community/netinfo"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"
import {
  defaultShouldDehydrateQuery,
  focusManager,
  onlineManager,
  QueryClient,
} from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import { isCancel } from "axios"
import type { ReactNode } from "react"
import React, { useEffect } from "react"
import type { AppStateStatus } from "react-native"
import { AppState, Platform } from "react-native"

import { storage } from "../../shared/lib"

const logError = (error: Error) => {
  if (__DEV__) console.error(error)
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (error, query) => {
        logError(
          new Error(`Query error: ${query.queryHash}\n${String(error)}}`),
        )
        return false
      },
    },
    mutations: {
      onError: (error) => {
        if (!isCancel(error)) logError(error)
      },
    },
  },
})
export const persister = createSyncStoragePersister({ storage })

// Refetch on reconnect (https://tanstack.com/query/latest/docs/framework/react/react-native)
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})

const useRefetchOnAppFocus = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => {
        if (Platform.OS !== "web") {
          focusManager.setFocused(status === "active")
        }
      },
    )

    return () => subscription.remove()
  }, [])
}

const persistedQueries = ["own-user"]

export function QueryProvider({ children }: { children: ReactNode }) {
  useRefetchOnAppFocus()

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            if (!defaultShouldDehydrateQuery(query)) return false
            return persistedQueries.includes(String(query.queryKey[0]))
          },
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}
