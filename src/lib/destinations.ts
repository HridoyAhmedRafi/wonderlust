/* Shape of the destination payload served by the backend API.
   The backend/database is the single source of truth — no UI-side mock data. */
export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};
