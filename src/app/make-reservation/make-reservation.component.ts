import { Component, Input } from '@angular/core';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  styleUrls: ['./make-reservation.component.scss'],
})
export class MakeReservationComponent {
  @Input() currentFlight: Flight | null = null;

  setCurrentFlight(flight: Flight): void {
    if (flight) {
      console.log(flight);
      this.currentFlight = flight;
    }
  }
}
