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
          <Text variant="secondary">★ {hotel.stars}</Text>
          <Text variant="secondary">Rating: {hotel.userRating}/10</Text>
        </RatingRow>

        <Text variant="secondary">{hotel.location.address}</Text>

        <InfoRow>
          <Text variant="tertiary">
            Check-in: {hotel.checkIn.from} {hotel.checkIn.to}
          </Text>
          <Text variant="tertiary">
            Check-out: {hotel.checkOut.from} {hotel.checkOut.to}
          </Text>
        </InfoRow>

        <ContactInfo>
          <Text variant="tertiary">{hotel.contact.email}</Text>
          <Text variant="tertiary">{hotel.contact.phoneNumber}</Text>
        </ContactInfo>

        <PriceContainer>
          <Text variant="primary" style={{ fontSize: 20, fontWeight: "bold" }}>
            {hotel.price} {hotel.currency}
          </Text>
          <Text variant="tertiary">per night</Text>
        </PriceContainer>
      </Content>
    </Container>
  )
}

const Container = styled.View`
  margin: 8px 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.surface};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
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
  height: 200px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
`

const HotelImage = styled(FastImage)`
  width: 100%;
  height: 100%;
`

const Content = styled.View`
  padding: 12px;
  gap: 8px;
`

const RatingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
`

const ContactInfo = styled.View`
  margin-top: 4px;
`

const PriceContainer = styled.View`
  align-items: flex-end;
  margin-top: 8px;
`
