# Hotel Room Reservation System

## Overview
A smart hotel room booking system for a 97-room hotel across 10 floors with an intelligent algorithm that minimizes guest travel time between booked rooms.

## Features
- ✅ Interactive visual representation of all 97 hotel rooms
- ✅ Smart booking algorithm that minimizes travel time
- ✅ Support for booking 1-5 rooms at a time
- ✅ Random occupancy generator for testing
- ✅ Reset functionality to clear all bookings
- ✅ Real-time statistics display
- ✅ Responsive design for mobile and desktop

## Hotel Structure
- **Floors 1-9**: 10 rooms each (101-110, 201-210, ..., 901-910)
- **Floor 10**: 7 rooms (1001-1007)
- **Total**: 97 rooms
- **Layout**: Stairs/lift on the left, rooms arranged left to right

## Travel Time Calculation
- **Horizontal movement**: 1 minute per room
- **Vertical movement**: 2 minutes per floor
- **Formula**: `Total Time = (Floor Difference × 2) + (Position Difference × 1)`

## Booking Algorithm

### Priority Order:
1. **Same Floor First**: Attempts to book all rooms on a single floor
2. **Minimize Horizontal Distance**: Prefers consecutive or near-consecutive rooms
3. **Cross-Floor Optimization**: If same-floor booking is unavailable, finds optimal combination across floors
4. **Travel Time Minimization**: Selects room combination with minimum total travel time

### Algorithm Steps:
1. Get all available rooms organized by floor
2. Check each floor for availability of requested number of rooms
3. For each floor with sufficient rooms, calculate travel time for different room combinations
4. If no single floor has enough rooms, perform cross-floor search
5. Use greedy approach starting from lowest floors, selecting rooms closest to stairs
6. Return optimal room combination with minimum travel time

## Files Structure
```
hotel-reservation/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── script.js           # Booking algorithm and logic
└── README.md           # This file
```

## Deployment Instructions

### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to project folder: `cd hotel-reservation`
3. Run: `vercel`
4. Follow prompts to deploy

### Option 3: GitHub Pages
1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select branch and root folder
5. Your site will be available at: `https://username.github.io/repo-name`

### Option 4: Local Testing
1. Open `index.html` directly in a web browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```
3. Navigate to `http://localhost:8000`

## Usage Instructions

### Booking Rooms
1. Enter the number of rooms (1-5) in the input field
2. Click "Book Rooms"
3. The system will automatically select optimal rooms and display:
   - Room numbers
   - Total travel time
   - Floor distribution

### Random Occupancy
- Click "Random Occupancy" to generate a random hotel state
- Useful for testing the booking algorithm under different scenarios

### Reset
- Click "Reset All" to clear all bookings and return to empty state

## Technical Details

### Technologies Used
- Pure HTML5, CSS3, JavaScript (ES6+)
- No external dependencies
- Fully responsive design
- Modern browser features

### Performance
- Instant booking calculation
- Smooth animations
- Optimized for 97 rooms
- Efficient combination search with limits for performance

## Algorithm Complexity
- **Same-floor search**: O(F × R × N) where F = floors, R = rooms per floor, N = requested rooms
- **Cross-floor search**: O(F × R) for greedy approach
- **Fallback exhaustive search**: Limited to 1000 combinations for performance

## Example Scenarios

### Scenario 1: Same Floor Booking
```
Available: Floor 1: 101, 102, 105, 106
Request: 4 rooms
Result: Rooms 101, 102, 105, 106 selected
Travel Time: 5 minutes (position difference from 101 to 106)
```

### Scenario 2: Cross-Floor Booking
```
Available: Floor 1: 101, 102 | Floor 2: 201, 202
Request: 4 rooms
Result: Rooms 101, 102, 201, 202 selected
Travel Time: 2 minutes vertical (1 floor × 2)
```

## Future Enhancements
- Multi-guest booking management
- Booking history and analytics
- Price optimization based on travel time
- Backend integration with database
- User authentication
- Booking cancellation
- Advanced filtering options

