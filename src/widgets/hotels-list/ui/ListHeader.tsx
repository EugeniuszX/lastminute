import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import { FilterIcon } from "../../../shared/assets/icons/Filter"
import { SortIcon } from "../../../shared/assets/icons/Sort"

interface ListHeaderProps {
  onPressSort: () => void
  onPressFilter: () => void
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  onPressSort,
  onPressFilter,
}) => {
  return (
    <Container>
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
  justify-content: flex-end;
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
