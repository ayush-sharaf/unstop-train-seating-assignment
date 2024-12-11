export interface Seat {
  id: number;
  isBooked: boolean;
  rowNumber: number;
}

export interface BookingResult {
  success: boolean;
  seats: number[];
  message: string;
}