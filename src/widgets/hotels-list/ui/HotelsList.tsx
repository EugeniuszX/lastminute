import React, { useCallback } from "react"
import { FlatList, type ListRenderItem } from "react-native"
import styled from "styled-components/native"

import type { Hotel } from "../../../entities/hotel"
import { HotelItem } from "./HotelItem"

interface HotelsListProps {
  data: Hotel[] | undefined
  headerComponent: React.ReactElement
}

export const HotelsList: React.FC<HotelsListProps> = ({
  data,
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
