import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightModalComponent } from './flight-modal.component';

describe('FlightModalComponent', () => {
  let component: FlightModalComponent;
  let fixture: ComponentFixture<FlightModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightModalComponent]
    });
    fixture = TestBed.createComponent(FlightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
