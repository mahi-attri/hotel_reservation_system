class HotelReservationSystem {
    constructor() {
        this.rooms = this.initializeRooms();
        this.lastBookedRooms = new Set();
        this.init();
    }

    initializeRooms() {
        const rooms = {};
        for (let floor = 1; floor <= 9; floor++) {
            for (let pos = 1; pos <= 10; pos++) {
                const n = floor * 100 + pos;
                rooms[n] = { number: n, floor, position: pos, occupied: false };
            }
        }
        for (let pos = 1; pos <= 7; pos++) {
            const n = 1000 + pos;
            rooms[n] = { number: n, floor: 10, position: pos, occupied: false };
        }
        return rooms;
    }

    init() {
        this.attachEventListeners();
        this.renderHotel();
        this.updateStats();
        this.showBookingInfo("Ready. Enter rooms (1–5) and click Book.", true);
    }

    attachEventListeners() {
        document.getElementById("bookBtn").addEventListener("click", () => this.bookRooms());
        document.getElementById("randomBtn").addEventListener("click", () => this.randomOccupancy());
        document.getElementById("resetBtn").addEventListener("click", () => this.resetAll());
    }

    renderHotel() {
        const container = document.getElementById("floorsContainer");
        container.innerHTML = "";

        for (let floor = 10; floor >= 1; floor--) {
            const floorDiv = document.createElement("div");
            floorDiv.className = "floor";

            const floorLabel = document.createElement("div");
            floorLabel.className = "floor-label";
            floorLabel.textContent = `Floor ${floor}`;

            const roomsDiv = document.createElement("div");
            roomsDiv.className = "rooms";

            const roomCount = floor === 10 ? 7 : 10;

            for (let pos = 1; pos <= roomCount; pos++) {
                const roomNumber = floor === 10 ? 1000 + pos : floor * 100 + pos;
                const roomBox = document.createElement("div");
                roomBox.className = "room-box";
                roomBox.textContent = roomNumber;
                roomBox.dataset.room = String(roomNumber);

                if (this.lastBookedRooms.has(roomNumber)) {
                    roomBox.classList.add("newly-booked");
                } else if (this.rooms[roomNumber].occupied) {
                    roomBox.classList.add("occupied");
                } else {
                    roomBox.classList.add("available");
                }

                roomsDiv.appendChild(roomBox);
            }

            floorDiv.appendChild(floorLabel);
            floorDiv.appendChild(roomsDiv);
            container.appendChild(floorDiv);
        }
    }

    getAvailableRoomsByFloor() {
        const byFloor = {};
        for (let f = 1; f <= 10; f++) byFloor[f] = [];
        for (const k of Object.keys(this.rooms)) {
            const n = Number(k);
            if (!this.rooms[n].occupied) byFloor[this.rooms[n].floor].push(n);
        }
        for (let f = 1; f <= 10; f++) {
            byFloor[f].sort((a, b) => this.rooms[a].position - this.rooms[b].position);
        }
        return byFloor;
    }

    sortRoomNumbers(roomNums) {
        return [...roomNums].sort((a, b) => {
            const fa = this.rooms[a].floor, fb = this.rooms[b].floor;
            if (fa !== fb) return fa - fb;
            return this.rooms[a].position - this.rooms[b].position;
        });
    }

    travelTimeBetween(roomA, roomB) {
        const a = this.rooms[roomA];
        const b = this.rooms[roomB];
        const floorDiff = Math.abs(a.floor - b.floor);
        const posDiff = Math.abs(a.position - b.position);
        return floorDiff * 2 + posDiff;
    }

    totalTravelTimeForSelection(roomNums) {
        if (!roomNums || roomNums.length <= 1) return 0;
        const sorted = this.sortRoomNumbers(roomNums);
        return this.travelTimeBetween(sorted[0], sorted[sorted.length - 1]);
    }

    bestWindowOnSameFloor(k, byFloor) {
        let best = null;

        for (let f = 1; f <= 10; f++) {
            const arr = byFloor[f];
            if (arr.length < k) continue;

            for (let i = 0; i <= arr.length - k; i++) {
                const window = arr.slice(i, i + k);
                const time = this.travelTimeBetween(window[0], window[window.length - 1]);

                if (
                    !best ||
                    time < best.time ||
                    (time === best.time && f < best.floor) ||
                    (time === best.time && f === best.floor && this.rooms[window[0]].position < this.rooms[best.rooms[0]].position)
                ) {
                    best = { rooms: window, time, floor: f };
                }
            }
        }

        return best ? best.rooms : null;
    }

    bestWindowAcrossFloors(k, allAvailableSorted) {
        if (allAvailableSorted.length < k) return null;

        let best = null;

        for (let i = 0; i <= allAvailableSorted.length - k; i++) {
            const window = allAvailableSorted.slice(i, i + k);
            const first = window[0];
            const last = window[window.length - 1];
            const time = this.travelTimeBetween(first, last);

            const floorSpan = Math.abs(this.rooms[first].floor - this.rooms[last].floor);
            const startFloor = this.rooms[first].floor;
            const startPos = this.rooms[first].position;

            if (
                !best ||
                time < best.time ||
                (time === best.time && floorSpan < best.floorSpan) ||
                (time === best.time && floorSpan === best.floorSpan && startFloor < best.startFloor) ||
                (time === best.time && floorSpan === best.floorSpan && startFloor === best.startFloor && startPos < best.startPos)
            ) {
                best = { rooms: window, time, floorSpan, startFloor, startPos };
            }
        }

        return best ? best.rooms : null;
    }

    bookRooms() {
        const numRooms = Number(document.getElementById("numRooms").value);

        if (!Number.isInteger(numRooms) || numRooms < 1 || numRooms > 5) {
            this.showBookingInfo("Please enter a number between 1 and 5.", false);
            return;
        }

        const byFloor = this.getAvailableRoomsByFloor();
        const hasSameFloorOption = Object.values(byFloor).some(arr => arr.length >= numRooms);

        let selected = null;

        if (hasSameFloorOption) {
            selected = this.bestWindowOnSameFloor(numRooms, byFloor);
        } else {
            const allAvail = [];
            for (let f = 1; f <= 10; f++) allAvail.push(...byFloor[f]);
            const sortedAll = this.sortRoomNumbers(allAvail);
            selected = this.bestWindowAcrossFloors(numRooms, sortedAll);
        }

        if (!selected) {
            this.showBookingInfo(`Unable to book ${numRooms} room(s). Not enough available rooms.`, false);
            return;
        }

        for (const r of selected) this.rooms[r].occupied = true;
        this.lastBookedRooms = new Set(selected);

        const travelTime = this.totalTravelTimeForSelection(selected);
        const sorted = this.sortRoomNumbers(selected);
        const first = sorted[0];
        const last = sorted[sorted.length - 1];

        this.renderHotel();
        this.updateStats();
        this.showBookingInfo(
            `Booked ${numRooms} room(s).`,
            true,
            selected,
            travelTime,
            first,
            last
        );
    }

    showBookingInfo(message, success, rooms = [], travelTime = 0, firstRoom = null, lastRoom = null) {
        const infoDiv = document.getElementById("bookingInfo");
        infoDiv.className = "booking-info show";

        if (!success) {
            infoDiv.classList.add("error");
            infoDiv.innerHTML = `<h3>${message}</h3>`;
            setTimeout(() => infoDiv.classList.remove("show"), 6000);
            return;
        }

        infoDiv.classList.add("success");

        const sorted = this.sortRoomNumbers(rooms);
        const floors = [...new Set(sorted.map(r => this.rooms[r].floor))];

        const travelBreakdown = firstRoom && lastRoom
            ? (() => {
                const a = this.rooms[firstRoom];
                const b = this.rooms[lastRoom];
                const floorDiff = Math.abs(a.floor - b.floor);
                const posDiff = Math.abs(a.position - b.position);
                return {
                    floorDiff,
                    posDiff,
                    vertical: floorDiff * 2,
                    horizontal: posDiff,
                    total: floorDiff * 2 + posDiff
                };
            })()
            : null;

        let html = `<h3>${message}</h3>`;
        html += `<div class="rooms-list">`;
        for (const r of sorted) html += `<span class="room-tag">${r}</span>`;
        html += `</div>`;

        if (travelBreakdown) {
            html += `<p style="margin-top:10px;"><strong>First Room:</strong> ${firstRoom} &nbsp; <strong>Last Room:</strong> ${lastRoom}</p>`;
            html += `<p><strong>Travel Time:</strong> ${travelBreakdown.total} min = (2 × ${travelBreakdown.floorDiff}) + (${travelBreakdown.posDiff})</p>`;
        } else {
            html += `<p style="margin-top:10px;"><strong>Travel Time:</strong> ${travelTime} minutes</p>`;
        }

        if (floors.length === 1) {
            html += `<p><strong>Location:</strong> Same floor (Floor ${floors[0]})</p>`;
        } else {
            html += `<p><strong>Location:</strong> Across floors (${floors.join(", ")})</p>`;
        }

        infoDiv.innerHTML = html;

        setTimeout(() => infoDiv.classList.remove("show"), 8000);
    }

    randomOccupancy() {
        for (const k of Object.keys(this.rooms)) this.rooms[Number(k)].occupied = false;

        const totalRooms = Object.keys(this.rooms).length;
        const occupancyRate = 0.3 + Math.random() * 0.3;
        const roomsToOccupy = Math.floor(totalRooms * occupancyRate);

        const all = Object.keys(this.rooms).map(Number);
        for (let i = all.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all[i], all[j]] = [all[j], all[i]];
        }

        for (let i = 0; i < roomsToOccupy; i++) this.rooms[all[i]].occupied = true;

        this.lastBookedRooms = new Set();
        this.renderHotel();
        this.updateStats();
        this.showBookingInfo(`Random occupancy generated: ${roomsToOccupy} rooms occupied.`, true);
    }

    resetAll() {
        for (const k of Object.keys(this.rooms)) this.rooms[Number(k)].occupied = false;
        this.lastBookedRooms = new Set();
        this.renderHotel();
        this.updateStats();
        this.showBookingInfo("All bookings reset. All rooms are available.", true);
    }

    updateStats() {
        const total = Object.keys(this.rooms).length;
        const occupied = Object.values(this.rooms).filter(r => r.occupied).length;
        const available = total - occupied;

        document.getElementById("totalRooms").textContent = total;
        document.getElementById("availableRooms").textContent = available;
        document.getElementById("occupiedRooms").textContent = occupied;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new HotelReservationSystem();
});
