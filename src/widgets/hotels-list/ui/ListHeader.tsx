import React from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import { Text } from "../../../shared/ui"

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
      <ActionButton onPress={onPressSort}>
        <Text variant="primary">Sort by</Text>
      </ActionButton>
      <ActionButton onPress={onPressFilter}>
        <Text variant="primary">Filter</Text>
      </ActionButton>
    </Container>
  )
}

const Container = styled.View`
  flex-direction: row;
  padding: 16px;
  background-color: ${({ theme }) => theme.surface};
  gap: 12px;
`

const ActionButton = styled(TouchableOpacity)`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
`
