import type BottomSheet from "@gorhom/bottom-sheet"
import React, { useMemo, useRef } from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import { Text, WithBottomSheet } from "../../shared/ui"

export type SortOption = "price" | "rating"
export type SortOrder = "asc" | "desc"

interface Props {
  selectedOption?: SortOption
  selectedOrder?: SortOrder
  onSelect: (option: SortOption, order: SortOrder) => void
  onClose: () => void
}

export const SortHotels: React.FC<Props> = ({
  selectedOption,
  selectedOrder,
  onSelect,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => [400], [])

  return (
    <WithBottomSheet
      bottomSheetRef={bottomSheetRef}
      handleCloseSheet={onClose}
      snapPoints={snapPoints}
    >
      <Container>
        <Title variant="primary">Sort by</Title>
        <OptionGroup>
          <Option
            active={selectedOption === "price" && selectedOrder === "asc"}
            onPress={() => onSelect("price", "asc")}
          >
            <Text variant="primary">Price: Low to High</Text>
          </Option>
          <Option
            active={selectedOption === "price" && selectedOrder === "desc"}
            onPress={() => onSelect("price", "desc")}
          >
            <Text variant="primary">Price: High to Low</Text>
          </Option>
          <Option
            active={selectedOption === "rating" && selectedOrder === "desc"}
            onPress={() => onSelect("rating", "desc")}
          >
            <Text variant="primary">Rating: High to Low</Text>
          </Option>
          <Option
            active={selectedOption === "rating" && selectedOrder === "asc"}
            onPress={() => onSelect("rating", "asc")}
          >
            <Text variant="primary">Rating: Low to High</Text>
          </Option>
        </OptionGroup>
      </Container>
    </WithBottomSheet>
  )
}

const Container = styled.View`
  padding: 16px;
  gap: 16px;
`

const Title = styled(Text)`
  font-size: 20px;
  font-weight: 600;
`

const OptionGroup = styled.View`
  gap: 12px;
`

const Option = styled(TouchableOpacity)<{ active?: boolean }>`
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ theme, active }) =>
    active ? theme.primary + "20" : theme.surface};
  border: 1px solid
    ${({ theme, active }) => (active ? theme.primary : theme.border)};
`
