import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { useTheme } from "styled-components/native"
import styled from "styled-components/native"

import { useUserStore } from "../../entities/user"
import { Text, WithSafeArea } from "../../shared/ui"
import { HotelsList } from "../../widgets/hotels-list"
import type { RootStackListType } from ".."

interface FavoritesScreenProps {
  navigation: NativeStackNavigationProp<RootStackListType, "HotelDetails">
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme()
  const { favorites } = useUserStore()

  return (
    <WithSafeArea color={theme.surface}>
      <HotelsList
        headerComponent={
          <Container>
            <BackButton onPress={navigation.goBack}>
              <Text variant="primary">←</Text>
            </BackButton>
          </Container>
        }
        emptyComponent={
          <EmptyContainer>
            <EmptyText variant="primary">No favorite hotels yet</EmptyText>
            <EmptyDescription variant="secondary">
              Add hotels to your favorites to see them here
            </EmptyDescription>
          </EmptyContainer>
        }
        data={favorites}
      />
    </WithSafeArea>
  )
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.surface};
`

const BackButton = styled.TouchableOpacity`
  margin-right: 16px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 8px;
  border-radius: 50px;
`

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 32px;
  margin-top: 25%;
  gap: 8px;
`

const EmptyText = styled(Text)`
  font-size: 20px;
  font-weight: 600;
`

const EmptyDescription = styled(Text)`
  text-align: center;
`
