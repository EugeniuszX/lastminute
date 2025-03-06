import type { RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import styled from "styled-components/native"

import { Text, WithSafeArea } from "../../shared/ui"
import type { RootStackListType } from "../index"

interface Props {
  navigation: NativeStackNavigationProp<RootStackListType, "HotelDetails">
  route: RouteProp<RootStackListType, "HotelDetails">
}

export const HotelDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data } = route.params
  return (
    <WithSafeArea>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Text variant="primary" style={{ fontSize: 28 }}>
              ←
            </Text>
          </BackButton>

          <ImageContainer>
            <HotelImage source={{ uri: data.gallery[0] }} />
          </ImageContainer>

          <HeaderContent>
            <HeaderTop>
              <HotelName variant="primary">{data.name}</HotelName>
              <PriceContainer>
                <PriceText variant="primary">
                  {data.price} {data.currency}
                </PriceText>
                <Text variant="tertiary">per night</Text>
              </PriceContainer>
            </HeaderTop>

            <RatingContainer>
              <StarRating>★ {data.stars}</StarRating>
              <Text variant="secondary">Rating: {data.userRating}/10</Text>
            </RatingContainer>

            <Address variant="secondary">{data.location.address}</Address>
          </HeaderContent>
        </Header>

        <Content>
          <Section>
            <SectionTitle variant="primary">Check-in & Check-out</SectionTitle>
            <TimeInfo>
              <TimeBlock>
                <Text variant="secondary">Check-in</Text>
                <Text variant="primary">
                  {data.checkIn.from}-{data.checkIn.to}
                </Text>
              </TimeBlock>
              <TimeBlock>
                <Text variant="secondary">Check-out</Text>
                <Text variant="primary">
                  {data.checkOut.from}-{data.checkOut.to}
                </Text>
              </TimeBlock>
            </TimeInfo>
          </Section>

          <Section>
            <SectionTitle variant="primary">Contact Information</SectionTitle>
            <ContactBlock>
              <Text variant="secondary">Email</Text>
              <Text variant="primary">{data.contact.email}</Text>
            </ContactBlock>
            <ContactBlock>
              <Text variant="secondary">Phone</Text>
              <Text variant="primary">{data.contact.phoneNumber}</Text>
            </ContactBlock>
          </Section>
        </Content>
      </Container>
    </WithSafeArea>
  )
}

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const Header = styled.View`
  background-color: ${({ theme }) => theme.surface};
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  shadow-color: ${({ theme }) => theme.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;
  elevation: 8;
`

const HeaderContent = styled.View`
  padding: 20px;
  gap: 12px;
`

const HeaderTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`

const HotelName = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  flex: 1;
`

const ImageContainer = styled(FastImage)`
  height: 300px;
  width: 100%;
`

const BackButton = styled(TouchableOpacity)`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  shadow-color: ${({ theme }) => theme.cardShadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`

const HotelImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`

const StarRating = styled(Text)`
  color: ${({ theme }) => theme.rating};
  font-weight: 600;
  font-size: 16px;
`

const Address = styled(Text)`
  margin-top: 4px;
`

const Content = styled.View`
  padding: 20px;
  gap: 24px;
`

const Section = styled.View`
  gap: 16px;
`

const SectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
`

const TimeInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
`

const TimeBlock = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  gap: 8px;
`

const ContactBlock = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  gap: 8px;
`

const PriceContainer = styled.View`
  align-items: flex-end;
`

const PriceText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`
