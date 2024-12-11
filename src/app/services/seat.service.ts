import { Injectable } from '@angular/core';
import { Seat, BookingResult } from '../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private totalSeats = 80;
  private seatsPerRow = 7;
  private seats: Seat[] = [];

  constructor() {
    this.initializeSeats();
  }

  private initializeSeats() {
    for (let i = 0; i < this.totalSeats; i++) {
      const rowNumber = Math.floor(i / this.seatsPerRow);
      this.seats.push({
        id: i + 1,
        isBooked: false,
        rowNumber
      });
    }
  }

  getSeats(): Seat[] {
    return this.seats;
  }

  bookSeats(numberOfSeats: number): BookingResult {
    if (numberOfSeats > 7) {
      return {
        success: false,
        seats: [],
        message: 'Cannot book more than 7 seats at a time'
      };
    }

    // First try to find seats in the same row
    for (let rowNumber = 0; rowNumber < Math.ceil(this.totalSeats / this.seatsPerRow); rowNumber++) {
      const rowSeats = this.seats.filter(seat => seat.rowNumber === rowNumber && !seat.isBooked);
      
      if (rowSeats.length >= numberOfSeats) {
        const bookedSeats = rowSeats.slice(0, numberOfSeats);
        bookedSeats.forEach(seat => seat.isBooked = true);
        return {
          success: true,
          seats: bookedSeats.map(seat => seat.id),
          message: 'Seats booked successfully in the same row'
        };
      }
    }

    // If seats not available in same row, find nearby seats
    const availableSeats = this.seats.filter(seat => !seat.isBooked);
    if (availableSeats.length >= numberOfSeats) {
      const bookedSeats = availableSeats.slice(0, numberOfSeats);
      bookedSeats.forEach(seat => seat.isBooked = true);
      return {
        success: true,
        seats: bookedSeats.map(seat => seat.id),
        message: 'Seats booked successfully in nearby rows'
      };
    }

    return {
      success: false,
      seats: [],
      message: 'Not enough seats available'
    };
  }
}