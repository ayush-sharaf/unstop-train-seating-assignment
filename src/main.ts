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
      <h1 class="title">Train Seat Reservation System</h1>

      <div class="booking-form">
        <input 
          type="number" 
          [(ngModel)]="numberOfSeats" 
          min="1" 
          max="7"
          placeholder="Number of seats (1-7)"
          class="input-field"
        >
        <button (click)="bookSeats()" class="primary-button">Book Seats</button>
      </div>

      <div 
        class="message" 
        *ngIf="message" 
        [class.error]="!bookingSuccess"
      >
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
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f6f8;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #333;
    }
    .booking-form {
      margin: 20px 0;
      display: flex;
      gap: 15px;
      justify-content: center;
      align-items: center;
    }
    .input-field {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ddd;
      border-radius: 6px;
      width: 200px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .primary-button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .primary-button:hover {
      background-color: #0056b3;
    }
    .message {
      padding: 15px;
      margin: 10px 0;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      color: white;
    }
    .message.error {
      background-color: #e74c3c;
    }
    .message:not(.error) {
      background-color: #27ae60;
    }
    .booked-seats {
      margin: 20px 0;
      text-align: center;
    }
    .booked-seats h3 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .booked-seats p {
      font-size: 16px;
      color: #555;
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
