export type Hotel = {
  id: number
  name: string
  checkIn: DateRange
  checkOut: DateRange
  currency: string
  price: number
  stars: number
  userRating: number
  gallery: string[]
  contact: {
    phoneNumber: string
    email: string
  }
  location: {
    address: string
    city: string
    latitude: number
    longitude: number
  }
}

type DateRange = {
  from: string
  to: string
}
