import { Component, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FlightModalComponent } from '../flight-modal/flight-modal.component';
import { ApiService } from '../api.service';
import { Flight } from '../models/flight.model';
import { ViewSeatsComponent } from '../view-seats/view-seats.component';
@Component({
  selector: 'app-flight-management',
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.scss'],
})
export class FlightManagementComponent {
  @ViewChild(ViewSeatsComponent) viewSeatsComponent!: ViewSeatsComponent;
  modalRef: MdbModalRef<FlightModalComponent> | null = null;
  currentTab:
    | 'search'
    | 'viewSeats'
    | 'makeReservation'
    | 'issueTicket'
    | 'handleRefund'
    | 'manageBookings' = 'search';
  flights: Flight[] = [];

  constructor(
    private modalService: MdbModalService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadFlights();
  }
  openFlightModal(flightNumber: string): void {
    const selectedFlight = this.flights.find(
      (flight) => flight.flightNumber === flightNumber
    );
    console.log(selectedFlight);
    this.modalRef = this.modalService.open(FlightModalComponent, {
      modalClass: 'modal-xl modal-dialog-centered',
      data: { flight: selectedFlight },
    });
  }
  selectFlight(flight: Flight): void {
    this.viewSeatsComponent.setCurrentFlight(flight);
  }
  switchTab(
    tab:
      | 'search'
      | 'viewSeats'
      | 'makeReservation'
      | 'issueTicket'
      | 'handleRefund'
      | 'manageBookings'
  ): void {
    this.currentTab = tab;
  }

  private loadFlights(): void {
    this.apiService.getFlights().subscribe(
      (flights: Flight[]) => {
        this.flights = flights;
      },
      (error) => {
        console.error('Error loading flights:', error);
      }
    );
  }
}
