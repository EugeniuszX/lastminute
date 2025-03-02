import React, { useCallback } from "react"
import type { ListRenderItem } from "react-native"
import { FlatList } from "react-native"
import styled from "styled-components/native"

import type { Hotel } from "../../../entities/hotel"
import { HotelItem } from "./HotelItem"

interface HotelsListProps {
  data: Hotel[] | undefined
  isLoading: boolean
}

export const HotelsList: React.FC<HotelsListProps> = ({ data }) => {
  const renderItem: ListRenderItem<Hotel> = useCallback(
    ({ item }) => <HotelItem hotel={item} />,
    [],
  )

  const keyExtractor = (item: Hotel) => `${item.name}-${item.id}`

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`
