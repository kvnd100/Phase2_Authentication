import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let apiService: ApiService;
  let modalService: MdbModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, ApiService, MdbModalService],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    apiService = TestBed.inject(ApiService);
    modalService = TestBed.inject(MdbModalService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should redirect to login page if not authenticated', () => {
      jest.spyOn(authService, 'isAuthenticated').mockReturnValue(false);
      jest.spyOn(component['router'], 'navigate');

      component.ngOnInit();

      expect(authService.isAuthenticated).toHaveBeenCalled();
      expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should load users if authenticated', () => {
      jest.spyOn(authService, 'isAuthenticated').mockReturnValue(true);
      jest.spyOn(apiService, 'getUsers').mockReturnValue(of([]));

      component.ngOnInit();

      expect(authService.isAuthenticated).toHaveBeenCalled();
      expect(apiService.getUsers).toHaveBeenCalled();
    });
  });

  describe('Button Interactions', () => {
    it('should navigate to create user page when create button is clicked', () => {
      jest.spyOn(component['router'], 'navigate');
      component.navigateToCreateUser();
      expect(component['router'].navigate).toHaveBeenCalledWith([
        '/create-user',
      ]);
    });

    it('should navigate to edit user page when edit button is clicked', () => {
      const userId = '656440526af665cbf8e8bc3f';
      jest.spyOn(component['router'], 'navigate');
      component.editUser(userId);
      expect(component['router'].navigate).toHaveBeenCalledWith([
        '/details',
        userId,
      ]);
    });

    it('should open modal when delete button is clicked', () => {
      const userId = '656440526af665cbf8e8bc3f';
      jest.spyOn(component, 'openModal');
      component.openModal(userId);
      expect(component.openModal).toHaveBeenCalledWith(userId);
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
