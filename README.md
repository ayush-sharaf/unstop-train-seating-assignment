# Train Seat Reservation System

A simple and efficient train seat reservation system built with Angular that allows users to book seats with smart seat allocation logic.

## Live Demo

🚀 [Live Demo](https://unstop-train-seating-assignment.vercel.app/)

## Features

- 80 seats coach layout with 7 seats per row (last row: 3 seats)
- Visual representation of seat availability
- Smart seat allocation prioritizing same-row bookings
- Support for booking up to 7 seats at once
- Real-time seat availability updates
- Responsive design

## Database Structure

The application uses a relational database design to manage seat bookings efficiently. For detailed information about the database schema, tables, relationships, and sample queries, please refer to the [Database Documentation](DATABASE.md).

Key database features:
- Scalable design supporting multiple coaches
- Efficient booking management
- Transaction support for data consistency
- Comprehensive booking history tracking

## Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ayush-sharaf/unstop-train-seating-assignment.git
cd unstop-train-seating-assignment
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:4200
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── seat-layout/
│   │       └── seat-layout.component.ts
│   ├── models/
│   │   └── seat.model.ts
│   └── services/
│       └── seat.service.ts
├── global_styles.css
├── index.html
└── main.ts
```

### Key Components

- `SeatLayoutComponent`: Handles the visual representation of seats
- `SeatService`: Manages seat booking logic and state
- `seat.model.ts`: Contains interfaces for Seat and BookingResult

## Usage

1. Enter the number of seats you want to book (1-7)
2. Click the "Book Seats" button
3. The system will:
   - Attempt to book seats in the same row
   - If not possible, book nearby available seats
   - Display booking confirmation with seat numbers
   - Update the seat layout visualization

## Booking Rules

1. Maximum 7 seats can be booked at once
2. Priority is given to booking seats in the same row
3. If same-row booking is not possible, nearby seats are allocated
4. Seats are allocated sequentially when possible
5. Last row contains only 3 seats

## Color Coding

- Green: Available seats
- Red: Booked seats

## Development

### Adding New Features

1. Create new components in the `components` directory
2. Add services in the `services` directory
3. Define interfaces/types in the `models` directory

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Technical Details

- Framework: Angular 18
- State Management: Service-based
- Styling: CSS with Flexbox
- Architecture: Component-based with separation of concerns

## Assumptions

1. No persistence required (state resets on page refresh)
2. No authentication needed
3. Single coach implementation
4. Sequential seat numbering (1-80)