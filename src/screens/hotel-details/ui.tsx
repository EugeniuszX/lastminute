import type { RouteProp } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { useCallback, useState } from "react"
import type {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native"
import {
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import FastImage from "react-native-fast-image"
import ImageView from "react-native-image-viewing"
import { useSharedValue } from "react-native-reanimated"
import styled from "styled-components/native"

import { useUserStore } from "../../entities/user"
import { HeartIcon } from "../../shared/assets/icons/HeartIcon"
import { Text, WithSafeArea } from "../../shared/ui"
import type { RootStackListType } from "../index"

interface Props {
  navigation: NativeStackNavigationProp<RootStackListType, "HotelDetails">
  route: RouteProp<RootStackListType, "HotelDetails">
}

export const HotelDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data } = route.params
  const { isFavorite, setFavorites } = useUserStore()
  const isFavoriteShared = useSharedValue(isFavorite(data.id) ? 1 : 0)
  const [isImageViewVisible, setIsImageViewVisible] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { width } = useWindowDimensions()

  const images = data.gallery.map((uri) => ({ uri }))

  const toggleIsFavorite = () => setFavorites(data)

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<string>) => (
      <Pressable onPress={() => setIsImageViewVisible(true)}>
        <GalleryImage source={{ uri: item }} width={width} />
      </Pressable>
    ),
    [width],
  )

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    )
    setCurrentImageIndex(newIndex)
  }

  const keyExtractor = (_: string, index: number) => index.toString()

  return (
    <WithSafeArea>
      <Container>
        <Header>
          <BackButton onPress={() => navigation.goBack()}>
            <Text variant="primary" style={{ fontSize: 20 }}>
              ←
            </Text>
          </BackButton>

          <ImageContainer>
            {data.gallery.length > 1 ? (
              <GalleryContainer>
                <FlatList
                  data={data.gallery}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={onMomentumScrollEnd}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                />
                <PaginationContainer>
                  <Text variant="primary" style={{ color: "white" }}>
                    {currentImageIndex + 1}/{data.gallery.length}
                  </Text>
                </PaginationContainer>
              </GalleryContainer>
            ) : (
              <HotelImage source={{ uri: data.gallery[0] }} />
            )}
            <FavoriteButton>
              <HeartIcon
                isFavorite={isFavoriteShared}
                callback={toggleIsFavorite}
              />
            </FavoriteButton>
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
      <ImageView
        images={images}
        imageIndex={currentImageIndex}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
      />
    </WithSafeArea>
  )
}

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`

const GalleryContainer = styled.View`
  height: 300px;
  width: 100%;
`

const GalleryImage = styled(FastImage)<{ width: number }>`
  width: ${({ width }) => width}px;
  height: 300px;
`

const PaginationContainer = styled.View`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 12px;
  border-radius: 16px;
`

const FavoriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
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
