import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FlightModalComponent } from '../flight-modal/flight-modal.component';

@Component({
  selector: 'app-flight-management',
  templateUrl: './flight-management.component.html',
  styleUrls: ['./flight-management.component.scss'],
})
export class FlightManagementComponent {
  modalRef: MdbModalRef<FlightModalComponent> | null = null;
  currentTab:
    | 'search'
    | 'viewSeats'
    | 'makeReservation'
    | 'issueTicket'
    | 'handleRefund'
    | 'manageBookings' = 'search';

  constructor(private modalService: MdbModalService) {}

  openFlightModal(flightNumber: string): void {
    this.modalRef = this.modalService.open(FlightModalComponent, {
      modalClass: 'modal-xl modal-dialog-centered',
    });
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
}
