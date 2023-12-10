import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Flight } from '../models/flight.model';
@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss'],
})
export class SearchFlightsComponent {
  searchCriteria = { departure: '', destination: '' };
  searchResults: Flight[] = [];
  noResultsMessage = '';
  constructor(private apiService: ApiService) {}

  searchFlights(): void {
    const { departure, destination } = this.searchCriteria;
    this.apiService.searchFlights(departure, destination).subscribe(
      (results: Flight[]) => {
        this.searchResults = results;
        this.noResultsMessage =
          this.searchResults.length === 0 ? 'No results found.' : '';
      },
      (error) => {
        console.error('Error searching flights:', error);
        this.noResultsMessage =
          'Error fetching results. Please try again later.';
      }
    );
  }

  clearSearch(): void {
    this.searchCriteria.departure = '';
    this.searchCriteria.destination = '';
    this.searchResults = [];
    this.noResultsMessage = '';
  }
}
