import type BottomSheet from "@gorhom/bottom-sheet"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
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

export const FilterHotels: React.FC<FilterSheetProps> = ({
  options,
  onApply,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [localOptions, setLocalOptions] = useState(options)

  const snapPoints = useMemo(() => ["40%"], [])

  return (
    <WithBottomSheet
      bottomSheetRef={bottomSheetRef}
      handleCloseSheet={onClose}
      snapPoints={snapPoints}
    >
      <Container>
        <HeaderContainer>
          <Title variant="primary">Filters</Title>
          <ResetButton onPress={() => setLocalOptions({})}>
            <Text variant="secondary">Reset</Text>
          </ResetButton>
        </HeaderContainer>

        <FilterGroup>
          <FilterSection>
            <SectionTitle variant="secondary">Price Range</SectionTitle>
            <RangeInputs>
              <InputContainer>
                <InputLabel variant="tertiary">From</InputLabel>
                <Input
                  placeholder="Min price"
                  value={localOptions.minPrice?.toString()}
                  onChangeText={(value) =>
                    setLocalOptions((prev) => ({
                      ...prev,
                      minPrice: Number(value) || undefined,
                    }))
                  }
                  keyboardType="numeric"
                />
              </InputContainer>
              <InputContainer>
                <InputLabel variant="tertiary">To</InputLabel>
                <Input
                  placeholder="Max price"
                  value={localOptions.maxPrice?.toString()}
                  onChangeText={(value) =>
                    setLocalOptions((prev) => ({
                      ...prev,
                      maxPrice: Number(value) || undefined,
                    }))
                  }
                  keyboardType="numeric"
                />
              </InputContainer>
            </RangeInputs>
          </FilterSection>
        </FilterGroup>
        <ApplyButton onPress={() => onApply(localOptions)}>
          <Text variant="primary" style={{ color: "white", fontSize: 16 }}>
            Show Results
          </Text>
        </ApplyButton>
      </Container>
    </WithBottomSheet>
  )
}
const Container = styled.View`
  padding: 16px 20px;
  gap: 24px;
`

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Title = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`

const ResetButton = styled(TouchableOpacity)`
  padding: 8px;
`

const FilterGroup = styled.View`
  gap: 24px;
`

const FilterSection = styled.View`
  gap: 12px;
`

const SectionTitle = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`

const RangeInputs = styled.View`
  flex-direction: row;
  gap: 12px;
`

const InputContainer = styled.View`
  flex: 1;
  gap: 4px;
`

const InputLabel = styled(Text)`
  margin-left: 4px;
`

const Input = styled(BottomSheetTextInput)`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
`

const ApplyButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.primary};
  padding: 16px;
  margin-top: 16px;
  border-radius: 16px;
  align-items: center;
`
