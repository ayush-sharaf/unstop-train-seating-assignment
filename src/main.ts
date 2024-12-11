import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeatService } from './app/services/seat.service';
import { SeatLayoutComponent } from './app/components/seat-layout/seat-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, SeatLayoutComponent],
  template: `
    <div class="container">
      <h1>Train Seat Reservation System</h1>
      
      <div class="booking-form">
        <input 
          type="number" 
          [(ngModel)]="numberOfSeats" 
          min="1" 
          max="7"
          placeholder="Number of seats (1-7)"
        >
        <button (click)="bookSeats()">Book Seats</button>
      </div>

      <div class="message" *ngIf="message" [class.error]="!bookingSuccess">
        {{ message }}
      </div>

      <div class="booked-seats" *ngIf="lastBookedSeats.length">
        <h3>Last Booked Seats:</h3>
        <p>{{ lastBookedSeats.join(', ') }}</p>
      </div>

      <app-seat-layout [seats]="seats"></app-seat-layout>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .booking-form {
      margin: 20px 0;
      display: flex;
      gap: 10px;
    }
    input {
      padding: 8px;
      font-size: 16px;
    }
    button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
    .message {
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      background-color: #4CAF50;
      color: white;
    }
    .message.error {
      background-color: #ff4444;
    }
    .booked-seats {
      margin: 20px 0;
    }
  `]
})
export class App {
  numberOfSeats: number = 1;
  seats: any[] = [];
  message: string = '';
  bookingSuccess: boolean = false;
  lastBookedSeats: number[] = [];

  constructor(private seatService: SeatService) {
    this.seats = this.seatService.getSeats();
  }

  bookSeats() {
    if (this.numberOfSeats < 1 || this.numberOfSeats > 7) {
      this.message = 'Please enter a number between 1 and 7';
      this.bookingSuccess = false;
      return;
    }

    const result = this.seatService.bookSeats(this.numberOfSeats);
    this.message = result.message;
    this.bookingSuccess = result.success;
    this.lastBookedSeats = result.seats;
  }
}

bootstrapApplication(App);