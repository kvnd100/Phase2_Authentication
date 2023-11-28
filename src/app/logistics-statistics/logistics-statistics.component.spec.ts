import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticsStatisticsComponent } from './logistics-statistics.component';

describe('LogisticsStatisticsComponent', () => {
  let component: LogisticsStatisticsComponent;
  let fixture: ComponentFixture<LogisticsStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogisticsStatisticsComponent]
    });
    fixture = TestBed.createComponent(LogisticsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
