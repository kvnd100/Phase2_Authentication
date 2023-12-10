import { Component, Input } from '@angular/core';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-view-seats',
  templateUrl: './view-seats.component.html',
  styleUrls: ['./view-seats.component.scss'],
})
export class ViewSeatsComponent {
  @Input() currentFlight: Flight | null = null;

  dummyFlights = [
    {
      flightNumber: 'FLT001',
      route: 'New York to Los Angeles',
      departureTime: '2023-12-01 08:00 AM',
      arrivalTime: '2023-12-01 11:00 AM',
      aircraft: 'Boeing 737',
      flightPlan: [
        { location: 'New York', expectedTime: 800 },
        { location: 'Stop 1', expectedTime: 900 },
        { location: 'Stop 2', expectedTime: 950 },
        { location: 'Stop 3', expectedTime: 1000 },
        { location: 'Destination', expectedTime: 1100 },
      ],
      availableSeats: [
        { seatNumber: '1A', class: 'Business', status: 'Available' },
        { seatNumber: '1B', class: 'Business', status: 'Available' },
        { seatNumber: '2A', class: 'Economy', status: 'Available' },
        { seatNumber: '2B', class: 'Economy', status: 'Booked' },
        { seatNumber: '3A', class: 'Economy', status: 'Available' },
      ],
    },
  ];

  setCurrentFlight(flight: any): void {
    this.currentFlight =
      this.dummyFlights.find((f) => f.flightNumber === flight.flightNumber) ||
      null;
  }
}
