export interface IBooking {
  _id: string;
  username: string;
  email: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  destinationId: string;
  bookingDate: string;
  /* Not part of the API payload yet — the card falls back to "confirmed".
     Add `status` to the payload to drive the badge. */
  status?: "confirmed" | "pending";
}
