# Test Scenarios & Verification

## Manual Testing Guide

### Test Suite 1: Basic Functionality

#### Test 1.1: Book Single Room
**Steps:**
1. Open the application
2. Enter "1" in the number of rooms field
3. Click "Book Rooms"

**Expected Result:**
- ✅ One room is selected (likely 101 if hotel is empty)
- ✅ Room turns green (newly booked)
- ✅ Success message appears
- ✅ Travel time shows: 0 minutes
- ✅ Available count decreases by 1
- ✅ Occupied count increases by 1

**Status:** [ ]

---

#### Test 1.2: Book Maximum Rooms (5)
**Steps:**
1. Reset the hotel (click Reset)
2. Enter "5" in the field
3. Click "Book Rooms"

**Expected Result:**
- ✅ 5 consecutive rooms selected on Floor 1 (101-105)
- ✅ All 5 rooms turn green
- ✅ Travel time shows: 4 minutes (position 1 to 5)
- ✅ Message shows all 5 room numbers

**Status:** [ ]

---

#### Test 1.3: Invalid Input - Out of Range
**Steps:**
1. Enter "0" or "6" or "10"
2. Click "Book Rooms"

**Expected Result:**
- ✅ Error message: "Please enter a number between 1 and 5"
- ✅ No rooms are booked

**Status:** [ ]

---

### Test Suite 2: Same Floor Booking

#### Test 2.1: Consecutive Rooms Available
**Setup:**
1. Click "Random Occupancy" 
2. Manually ensure Floor 2 has rooms 201-205 available

**Steps:**
1. Enter "4" in the field
2. Click "Book Rooms"

**Expected Result:**
- ✅ 4 consecutive rooms selected on same floor
- ✅ Travel time = (highest position - lowest position) * 1
- ✅ Message says: "All rooms on Floor X"

**Status:** [ ]

---

#### Test 2.2: Rooms with Gaps
**Setup:**
1. Reset
2. Manually occupy rooms 103, 104, 107, 108 (click them if possible, or modify code temporarily)
3. This leaves: 101, 102, 105, 106, 109, 110 available on Floor 1

**Steps:**
1. Enter "4" in the field
2. Click "Book Rooms"

**Expected Result:**
- ✅ Should select: 101, 102, 105, 106 (as per problem example)
- ✅ Travel time: 5 minutes (position 1 to 6)
- ✅ Rooms highlighted in green

**Status:** [ ]

---

### Test Suite 3: Cross-Floor Booking

#### Test 3.1: Adjacent Floors
**Setup:**
1. Reset
2. Generate random occupancy until Floor 1 has only 2 available rooms
3. Ensure Floor 2 has at least 2 available rooms

**Steps:**
1. Enter "4" in the field
2. Click "Book Rooms"

**Expected Result:**
- ✅ 2 rooms from Floor 1, 2 rooms from Floor 2
- ✅ Travel time includes vertical component (2 minutes minimum for 1 floor)
- ✅ Message shows: "Rooms span across Floor(s) 1, 2"

**Status:** [ ]

---

#### Test 3.2: Multiple Floors
**Setup:**
1. Reset
2. Generate random occupancy
3. Ensure each floor has only 1-2 available rooms

**Steps:**
1. Enter "5" in the field
2. Click "Book Rooms"

**Expected Result:**
- ✅ 5 rooms selected from 2-3 floors
- ✅ Algorithm selects rooms to minimize travel time
- ✅ Rooms closer to stairs preferred
- ✅ Adjacent floors preferred over distant floors

**Status:** [ ]

---

### Test Suite 4: Edge Cases

#### Test 4.1: Full Hotel
**Setup:**
1. Click "Random Occupancy" multiple times
2. Or manually occupy all 97 rooms

**Steps:**
1. Enter any number (1-5)
2. Click "Book Rooms"

**Expected Result:**
- ✅ Error message: "Unable to book X room(s). Not enough available rooms."
- ✅ No changes to hotel state

**Status:** [ ]

---

#### Test 4.2: Exact Match
**Setup:**
1. Reset
2. Manually ensure exactly 3 rooms are available total

**Steps:**
1. Enter "3" in the field
2. Click "Book Rooms"

**Expected Result:**
- ✅ All 3 available rooms are booked
- ✅ Travel time calculated correctly
- ✅ Hotel becomes fully occupied

**Status:** [ ]

---

#### Test 4.3: Floor 10 Rooms
**Setup:**
1. Reset
2. Occupy all rooms on Floors 1-9
3. Leave Floor 10 rooms available (1001-1007)

**Steps:**
1. Enter "5" in the field
2. Click "Book Rooms"

**Expected Result:**
- ✅ 5 rooms from Floor 10 selected (1001-1005)
- ✅ Travel time calculated correctly
- ✅ Rooms displayed in proper floor

**Status:** [ ]

---

### Test Suite 5: UI/UX Tests

#### Test 5.1: Random Occupancy
**Steps:**
1. Click "Random Occupancy"
2. Observe the changes
3. Click again

**Expected Result:**
- ✅ Random rooms become occupied (red)
- ✅ Different pattern each time
- ✅ Statistics update correctly
- ✅ Message appears and auto-hides
- ✅ 30-60% occupancy rate

**Status:** [ ]

---

#### Test 5.2: Reset Functionality
**Steps:**
1. Book some rooms
2. Click "Reset All"

**Expected Result:**
- ✅ All rooms become available (white)
- ✅ Occupied count = 0
- ✅ Available count = 97
- ✅ Message confirms reset
- ✅ Previous booking info cleared

**Status:** [ ]

---

#### Test 5.3: Visual Feedback
**Steps:**
1. Book any number of rooms
2. Observe the animation

**Expected Result:**
- ✅ Newly booked rooms pulse/animate
- ✅ Green color clearly visible
- ✅ After 8 seconds, info message auto-hides
- ✅ Smooth transitions

**Status:** [ ]

---

#### Test 5.4: Responsive Design
**Steps:**
1. Open application on different devices/screen sizes
2. Test on: Desktop (1920px), Laptop (1366px), Tablet (768px), Mobile (375px)

**Expected Result:**
- ✅ Layout adjusts appropriately
- ✅ No horizontal scrolling (except hotel grid if needed)
- ✅ Buttons remain accessible
- ✅ Text is readable
- ✅ Room boxes remain clickable/visible

**Status:** [ ]

---

### Test Suite 6: Algorithm Verification

#### Test 6.1: Travel Time Calculation
**Manual Calculation Test:**

Example: Rooms 101 and 305
- Floor difference: |1 - 3| = 2 floors
- Position difference: |1 - 5| = 4 rooms
- Expected time: (2 × 2) + (4 × 1) = 8 minutes

**Steps:**
1. Set up specific room availability
2. Book rooms with known positions
3. Verify travel time matches manual calculation

**Status:** [ ]

---

#### Test 6.2: Same Floor Priority
**Steps:**
1. Setup: Floor 1 has 3 rooms, Floor 2 has 5 rooms
2. Request 3 rooms

**Expected Result:**
- ✅ Should select 3 rooms from Floor 1 (same floor priority)
- ✅ Should NOT use Floor 2 even though it has more rooms

**Status:** [ ]

---

#### Test 6.3: Optimization Verification
**Setup:**
1. Reset hotel
2. Available rooms:
   - Floor 1: 101, 110 (far apart)
   - Floor 2: 201, 202, 203 (consecutive)

**Steps:**
1. Request 3 rooms

**Expected Result:**
- ✅ Should select Floor 2 rooms (201, 202, 203)
- ✅ Travel time: 2 minutes (better than Floor 1's 9 minutes)

**Status:** [ ]

---

### Test Suite 7: Performance Tests

#### Test 7.1: Rapid Booking
**Steps:**
1. Click "Book Rooms" rapidly 10 times
2. Click "Reset All"
3. Repeat

**Expected Result:**
- ✅ No crashes or freezes
- ✅ All operations complete correctly
- ✅ UI remains responsive
- ✅ No memory leaks

**Status:** [ ]

---

#### Test 7.2: Large-Scale Randomization
**Steps:**
1. Click "Random Occupancy" 50 times rapidly

**Expected Result:**
- ✅ Application remains stable
- ✅ All updates render correctly
- ✅ No performance degradation

**Status:** [ ]

---

### Test Suite 8: Browser Compatibility

#### Test 8.1: Cross-Browser Testing
**Browsers to Test:**
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Expected Result:**
- ✅ Same functionality across all browsers
- ✅ Styling consistent
- ✅ No JavaScript errors in console

---

## Automated Testing Script (Optional)

```javascript
// Open browser console and paste this for automated testing

function runAutomatedTests() {
    console.log("Starting automated tests...");
    
    // Test 1: Book 1 room
    document.getElementById('numRooms').value = 1;
    document.getElementById('bookBtn').click();
    console.log("✓ Test 1: Booked 1 room");
    
    setTimeout(() => {
        // Test 2: Reset
        document.getElementById('resetBtn').click();
        console.log("✓ Test 2: Reset successful");
        
        setTimeout(() => {
            // Test 3: Book 5 rooms
            document.getElementById('numRooms').value = 5;
            document.getElementById('bookBtn').click();
            console.log("✓ Test 3: Booked 5 rooms");
            
            setTimeout(() => {
                // Test 4: Random occupancy
                document.getElementById('randomBtn').click();
                console.log("✓ Test 4: Random occupancy");
                
                console.log("All automated tests completed!");
            }, 1000);
        }, 1000);
    }, 1000);
}

// Run tests
runAutomatedTests();
```

---

## Success Criteria

### Minimum Requirements (Must Pass)
- [ ] All rooms visible (97 total)
- [ ] Booking works for 1-5 rooms
- [ ] Same floor priority implemented
- [ ] Travel time calculation correct
- [ ] Random occupancy generates variety
- [ ] Reset clears all bookings
- [ ] No JavaScript errors in console

### Quality Indicators (Should Pass)
- [ ] Smooth animations
- [ ] Clear visual feedback
- [ ] Responsive on mobile
- [ ] Professional appearance
- [ ] Intuitive user flow
- [ ] Fast performance (<100ms operations)

### Excellence Markers (Nice to Have)
- [ ] Edge cases handled gracefully
- [ ] Accessibility features
- [ ] Consistent cross-browser experience
- [ ] Clean, commented code
- [ ] Comprehensive documentation

---

## Test Report Template

```
HOTEL ROOM RESERVATION SYSTEM - TEST REPORT

Test Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

Tests Passed: ___ / 25
Tests Failed: ___ / 25

Critical Issues: ___________
Minor Issues: ___________
Recommendations: ___________

Overall Status: [ ] PASS  [ ] FAIL  [ ] NEEDS WORK
```

---

**Note**: Complete testing before submission to ensure all functionality works as expected.
