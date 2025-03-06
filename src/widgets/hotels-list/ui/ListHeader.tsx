import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import type { RootStackListType } from "../../../screens"
import { FilterIcon } from "../../../shared/assets/icons/Filter"
import { SortIcon } from "../../../shared/assets/icons/Sort"
import { StaticHeart } from "../../../shared/assets/icons/StaticHeart"

interface ListHeaderProps {
  onPressSort: () => void
  onPressFilter: () => void
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  onPressSort,
  onPressFilter,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackListType, "Home">>()

  const onPressFavorites = () => navigation.navigate("Favorites")

  return (
    <Container>
      <ActionButton onPress={onPressFavorites}>
        <StaticHeart />
      </ActionButton>
      <Row>
        <ActionButton onPress={onPressSort}>
          <SortIcon />
        </ActionButton>
        <ActionButton onPress={onPressFilter}>
          <FilterIcon />
        </ActionButton>
      </Row>
    </Container>
  )
}

const Row = styled.View`
  flex-direction: row;
  gap: 12px;
`

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  background-color: ${({ theme }) => theme.surface};
`

const ActionButton = styled(TouchableOpacity)`
  padding: 8px;
  border-radius: 300px;
  justify-content: center;
  align-items: center
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
`
