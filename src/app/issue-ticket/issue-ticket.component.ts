import { Component, Input } from '@angular/core';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-issue-ticket',
  templateUrl: './issue-ticket.component.html',
  styleUrls: ['./issue-ticket.component.scss'],
})
export class IssueTicketComponent {
  @Input() currentFlight: Flight | null = null;

  bookedUsers: any[] = [
    {
      passengerName: 'user1',
      seatNumber: 'A1',
      mealPreference: 'Vegetarian',
      travelClass: 'Business',
    },
    {
      passengerName: 'user2',
      seatNumber: 'A2',
      mealPreference: 'Non-Vegetarian',
      travelClass: 'Economy',
    },
  ];

  setCurrentFlight(flight: Flight): void {
    if (flight) {
      this.currentFlight = flight;
    }
  }
  issueTicket(bookedUser: any): void {
    if (this.currentFlight) {
      console.log('Issuing ticket for user:', bookedUser);
    }
  }
}
