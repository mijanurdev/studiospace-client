export type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  amenities: string[];
  overview: string;
  ownerEmail: string;
  ownerName: string;
  createdAt?: string;
};

export type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  hourlyRate: number;
  date: string;
  startTime: string;
  endTime: string;
  userEmail: string;
  userName: string;
  status: string;
  createdAt?: string;
};

export type StudioInput = {
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  amenities: string[];
  overview: string;
};

export type BookingInput = {
  studioId: string;
  date: string;
  startTime: string;
  endTime: string;
  userEmail: string;
  userName: string;
};