import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleRefundComponent } from './handle-refund.component';

describe('HandleRefundComponent', () => {
  let component: HandleRefundComponent;
  let fixture: ComponentFixture<HandleRefundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandleRefundComponent]
    });
    fixture = TestBed.createComponent(HandleRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
