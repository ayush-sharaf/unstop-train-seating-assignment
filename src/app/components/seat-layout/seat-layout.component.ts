import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seat } from '../../models/seat.model';

@Component({
  selector: 'app-seat-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="seat-container">
      <div class="row" *ngFor="let row of seatRows">
        <div 
          *ngFor="let seat of row" 
          class="seat" 
          [class.booked]="seat.isBooked"
          [class.available]="!seat.isBooked"
          [title]="seat.isBooked ? 'Booked' : 'Available'">
          {{ seat.id }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .seat-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 20px;
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .row {
      display: flex;
      gap: 15px;
      justify-content: center;
    }
    .seat {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      border: 2px solid transparent;
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .seat:hover {
      transform: scale(1.05);
      border: 2px solid #00c4cc;
    }
    .booked {
      background-color: #e74c3c;
      color: white;
      box-shadow: 0 2px 4px rgba(231, 76, 60, 0.6);
    }
    .available {
      background-color: #27ae60;
      color: white;
      box-shadow: 0 2px 4px rgba(39, 174, 96, 0.6);
    }
  `]
})
export class SeatLayoutComponent {
  @Input() seats: Seat[] = [];

  get seatRows(): Seat[][] {
    const rows: Seat[][] = [];
    let currentRow: Seat[] = [];
    
    this.seats.forEach((seat, index) => {
      currentRow.push(seat);
      if (currentRow.length === 7 || index === this.seats.length - 1) {
        rows.push([...currentRow]);
        currentRow = [];
      }
    });
    
    return rows;
  }
}
