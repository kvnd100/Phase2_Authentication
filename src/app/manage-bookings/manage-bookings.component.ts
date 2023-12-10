import { Component, OnInit } from '@angular/core';

const dummyBookings = [
  {
    flight: {
      flightNumber: 'FLT001',
      route: 'New York to Los Angeles',
      departureTime: '2023-12-01 08:00 AM',
      arrivalTime: '2023-12-01 11:00 AM',
      aircraft: 'Boeing 747',
    },
  },
  {
    flight: {
      flightNumber: 'FLT002',
      route: 'New York to Los Angeles',
      departureTime: '2023-12-01 08:00 AM',
      arrivalTime: '2023-12-01 11:00 AM',
      aircraft: 'Boeing 747',
    },
  },
];
@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss'],
})
export class ManageBookingsComponent implements OnInit {
  bookings: any[] = [];

  ngOnInit() {
    this.bookings = dummyBookings;
  }

  deleteBooking(booking: any): void {
    this.bookings = this.bookings.filter((b) => b.id !== booking.id);
  }

  updateBooking(booking: any): void {
    console.log('Update booking:', booking);
  }
}
