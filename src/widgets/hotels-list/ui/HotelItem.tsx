import React, { useState } from "react"
import FastImage from "react-native-fast-image"
import styled from "styled-components/native"

import type { Hotel } from "../../../entities/hotel"
import { Text } from "../../../shared/ui"

interface Props {
  hotel: Hotel
}

export const HotelItem: React.FC<Props> = ({ hotel }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <Container>
      <ImageContainer>
        {hotel.gallery.length && !imageError ? (
          <HotelImage
            source={{
              uri: hotel.gallery[0],
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onError={() => setImageError(true)}
          />
        ) : (
          <PlaceholderContainer>
            <Text variant="secondary">No image available</Text>
          </PlaceholderContainer>
        )}
      </ImageContainer>

      <Content>
        <Text variant="primary" style={{ fontSize: 18, fontWeight: "600" }}>
          {hotel.name}
        </Text>

        <RatingRow>
          <RatingText>★ {hotel.stars}</RatingText>
          <Text variant="secondary" style={{ fontWeight: "500" }}>
            Rating: {hotel.userRating}/10
          </Text>
        </RatingRow>

        <Text variant="secondary">{hotel.location.address}</Text>

        <InfoRow>
          <Text variant="tertiary">
            Check-in: {hotel.checkIn.from}-{hotel.checkIn.to}
          </Text>
          <Text variant="tertiary">
            Check-out: {hotel.checkOut.from}-{hotel.checkOut.to}
          </Text>
        </InfoRow>

        <ContactInfo>
          <Text variant="tertiary">{hotel.contact.email}</Text>
          <Text variant="tertiary">{hotel.contact.phoneNumber}</Text>
        </ContactInfo>

        <PriceContainer>
          <Price variant="primary">
            {hotel.price} {hotel.currency}
          </Price>
          <Text variant="tertiary">per night</Text>
        </PriceContainer>
      </Content>
    </Container>
  )
}

const Container = styled.View`
  margin: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.surface};
  shadow-color: ${({ theme }) => theme.primary};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.12;
  shadow-radius: 20px;
  elevation: 10;
`

const PlaceholderContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.surface};
  justify-content: center;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`

const ImageContainer = styled.View`
  height: 220px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
`

const Price = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`

const HotelImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`

const RatingText = styled(Text)`
  color: ${({ theme }) => theme.rating};
  font-weight: 600;
`

const Content = styled.View`
  padding: 16px;
  gap: 12px;
`

const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
`

const ContactInfo = styled.View`
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
`

const PriceContainer = styled.View`
  align-items: flex-end;
  margin-top: 4px;
`
