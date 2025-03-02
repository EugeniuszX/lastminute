import { useQuery } from "@tanstack/react-query"

import { client } from "../../../shared/api"
import type { Hotel } from "./types"

export const useHotels = () =>
  useQuery({
    queryKey: ["hotels"],
    queryFn: () => client.get<Hotel[]>("/hotel.json").then((res) => res.data),
  })
