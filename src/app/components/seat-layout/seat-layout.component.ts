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
          [class.available]="!seat.isBooked">
          {{ seat.id }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .seat-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
    }
    .row {
      display: flex;
      gap: 10px;
      justify-content: flex-start;
    }
    .seat {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
    }
    .booked {
      background-color: #ff4444;
      color: white;
    }
    .available {
      background-color: #44ff44;
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