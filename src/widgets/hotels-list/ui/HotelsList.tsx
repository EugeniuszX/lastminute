import React, { useCallback } from "react"
import { ActivityIndicator, FlatList, type ListRenderItem } from "react-native"
import styled from "styled-components/native"

import type { Hotel } from "../../../entities/hotel"
import { Text } from "../../../shared/ui"
import { HotelItem } from "./HotelItem"

interface HotelsListProps {
  data: Hotel[] | undefined
  isPending: boolean
  isError: boolean
  headerComponent?: React.ReactElement
}

export const HotelsList: React.FC<HotelsListProps> = ({
  data,
  isPending,
  isError,
  headerComponent,
}) => {
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
        stickyHeaderIndices={[0]}
        ListEmptyComponent={
          isError ? (
            <Text>Error</Text>
          ) : isPending ? (
            <ActivityIndicator />
          ) : (
            <Text>Empty</Text>
          )
        }
        ListHeaderComponent={headerComponent}
        contentContainerStyle={{ paddingBottom: 8 }}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`
