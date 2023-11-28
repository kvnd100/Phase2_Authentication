import { Component } from '@angular/core';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss'],
})
export class SearchFlightsComponent {
  searchCriteria = { departure: '', destination: '' };
  searchResults: any[] = [];

  searchFlights(): void {}

  clearSearch(): void {
    this.searchCriteria.departure = '';
    this.searchCriteria.destination = '';
    this.searchResults = [];
  }
}
