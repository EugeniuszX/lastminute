import type BottomSheet from "@gorhom/bottom-sheet"
import React, { useMemo, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import { Text, WithBottomSheet } from "../../shared/ui"

export interface FilterOptions {
  minPrice?: number
  maxPrice?: number
  minRating?: number
}

interface FilterSheetProps {
  options: FilterOptions
  onApply: (options: FilterOptions) => void
  onClose: () => void
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  options,
  onApply,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [localOptions, setLocalOptions] = useState(options)

  const snapPoints = useMemo(() => ["25%"], [])

  return (
    <WithBottomSheet
      bottomSheetRef={bottomSheetRef}
      handleCloseSheet={onClose}
      snapPoints={snapPoints}
    >
      <Container>
        <Title variant="primary">Filter</Title>
        <FilterGroup>
          <FilterSection>
            <Text variant="secondary">Price Range</Text>
            <RangeInputs>
              <Input
                placeholder="Min"
                value={localOptions.minPrice?.toString()}
                onChangeText={(value) =>
                  setLocalOptions((prev) => ({
                    ...prev,
                    minPrice: Number(value) || undefined,
                  }))
                }
                keyboardType="numeric"
              />
              <Input
                placeholder="Max"
                value={localOptions.maxPrice?.toString()}
                onChangeText={(value) =>
                  setLocalOptions((prev) => ({
                    ...prev,
                    maxPrice: Number(value) || undefined,
                  }))
                }
                keyboardType="numeric"
              />
            </RangeInputs>
          </FilterSection>

          <FilterSection>
            <Text variant="secondary">Minimum Rating</Text>
            <Input
              placeholder="Min Rating (0-10)"
              value={localOptions.minRating?.toString()}
              onChangeText={(value) =>
                setLocalOptions((prev) => ({
                  ...prev,
                  minRating: Number(value) || undefined,
                }))
              }
              keyboardType="numeric"
            />
          </FilterSection>

          <ApplyButton onPress={() => onApply(localOptions)}>
            <Text variant="primary" style={{ color: "white" }}>
              Apply Filters
            </Text>
          </ApplyButton>
        </FilterGroup>
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

const FilterGroup = styled.View`
  gap: 20px;
`

const FilterSection = styled.View`
  gap: 8px;
`

const RangeInputs = styled.View`
  flex-direction: row;
  gap: 12px;
`

const Input = styled.TextInput`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.primary};
`

const ApplyButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.primary};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
`
