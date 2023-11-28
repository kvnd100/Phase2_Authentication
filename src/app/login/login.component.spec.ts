import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.login and navigate to dashboard on successful login', () => {
    const username = 'testuser';
    const password = 'testpassword';

    const authServiceSpy = jest
      .spyOn(authService, 'login')
      .mockReturnValue(of({}));
    const routerSpy = jest.spyOn(router, 'navigate');

    component.username = username;
    component.password = password;

    component.onSubmit();

    expect(authServiceSpy).toHaveBeenCalledWith(username, password);
    expect(routerSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
