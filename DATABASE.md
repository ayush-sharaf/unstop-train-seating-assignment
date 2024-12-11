# Database Structure for Train Seat Reservation System

## Database Schema

### 1. Coaches Table
```sql
CREATE TABLE coaches (
    id INTEGER PRIMARY KEY,
    coach_number VARCHAR(10) UNIQUE NOT NULL,
    total_seats INTEGER NOT NULL,
    seats_per_row INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Seats Table
```sql
CREATE TABLE seats (
    id INTEGER PRIMARY KEY,
    coach_id INTEGER NOT NULL,
    seat_number INTEGER NOT NULL,
    row_number INTEGER NOT NULL,
    is_booked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coach_id) REFERENCES coaches(id),
    UNIQUE(coach_id, seat_number)
);
```

### 3. Bookings Table
```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    number_of_seats INTEGER NOT NULL,
    booking_status VARCHAR(20) NOT NULL, -- 'CONFIRMED', 'CANCELLED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Booking_Details Table
```sql
CREATE TABLE booking_details (
    id INTEGER PRIMARY KEY,
    booking_id INTEGER NOT NULL,
    seat_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (seat_id) REFERENCES seats(id),
    UNIQUE(booking_id, seat_id)
);
```

## Sample Queries

### 1. Initialize a Coach
```sql
INSERT INTO coaches (coach_number, total_seats, seats_per_row)
VALUES ('C001', 80, 7);
```

### 2. Initialize Seats for a Coach
```sql
INSERT INTO seats (coach_id, seat_number, row_number)
SELECT 
    1, -- coach_id
    generate_series(1, 80), -- seat_number
    (generate_series(1, 80) - 1) / 7 -- row_number
;
```

### 3. Get Available Seats in a Row
```sql
SELECT * FROM seats 
WHERE coach_id = 1 
AND row_number = 2 
AND is_booked = false 
ORDER BY seat_number;
```

### 4. Create a New Booking
```sql
-- Start Transaction
BEGIN;

-- Create booking record
INSERT INTO bookings (booking_reference, number_of_seats, booking_status)
VALUES ('BK001', 3, 'CONFIRMED')
RETURNING id;

-- Add booking details
INSERT INTO booking_details (booking_id, seat_id)
VALUES 
    (1, 15),
    (1, 16),
    (1, 17);

-- Update seat status
UPDATE seats 
SET is_booked = true 
WHERE id IN (15, 16, 17);

COMMIT;
```

## Indexes

```sql
-- Indexes for better query performance
CREATE INDEX idx_seats_coach_row ON seats(coach_id, row_number);
CREATE INDEX idx_seats_booking_status ON seats(is_booked);
CREATE INDEX idx_bookings_reference ON bookings(booking_reference);
CREATE INDEX idx_booking_details_booking ON booking_details(booking_id);
```

## Key Features of the Database Design

1. **Scalability**
   - Supports multiple coaches
   - Can handle large numbers of bookings
   - Efficient indexing for quick queries

2. **Data Integrity**
   - Foreign key constraints ensure referential integrity
   - Unique constraints prevent duplicate bookings
   - Transaction support for atomic operations

3. **Flexibility**
   - Can accommodate different coach configurations
   - Supports booking status tracking
   - Maintains booking history

4. **Performance**
   - Optimized indexes for common queries
   - Denormalized row_number for quick row-based queries
   - Efficient booking lookups

## Implementation Notes

1. **Transactions**
   - All booking operations should be wrapped in transactions
   - Ensures data consistency during concurrent bookings

2. **Status Management**
   - Booking status allows for cancellation tracking
   - Seat status is separate from booking status

3. **Timestamps**
   - All tables include created_at/updated_at for auditing
   - Helps in tracking booking history and patterns

4. **Constraints**
   - Prevents overbooking
   - Ensures data consistency
   - Maintains referential integrity

## Migration Strategy

1. **Initial Setup**
```sql
-- Create tables in order
CREATE TABLE coaches ...
CREATE TABLE seats ...
CREATE TABLE bookings ...
CREATE TABLE booking_details ...

-- Add indexes
CREATE INDEX ...

-- Initialize first coach
INSERT INTO coaches ...

-- Initialize seats
INSERT INTO seats ...
```

2. **Data Migration**
   - Export current in-memory data
   - Map to new database schema
   - Import using transaction blocks