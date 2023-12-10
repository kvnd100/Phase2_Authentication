import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { User, UserRole } from '../models/user.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private loggedInUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  loggedInUser$: Observable<User | null> =
    this.loggedInUserSubject.asObservable();

  private userIdSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  userId$: Observable<string | null> = this.userIdSubject.asObservable();

  private initializationSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  initializationComplete$: Observable<boolean> =
    this.initializationSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.initializeAuth();
  }

  public initializeAuth(): void {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      this.loadUserFromStorage(storedToken);
    } else {
      this.initializationSubject.next(true);
    }
  }

  private loadUserFromStorage(storedToken: string): void {
    this.apiService
      .getUserDetailsFromToken(storedToken)
      .pipe(
        switchMap((user) => {
          this.handleLoginSuccess(user);
          this.userIdSubject.next(user.id);
          this.initializationSubject.next(true);
          return [];
        }),
        catchError((error) => {
          console.error('Error fetching user details from token:', error);
          this.initializationSubject.next(true);
          return [];
        })
      )
      .subscribe();
  }

  login(username: string, password: string): Observable<any> {
    return this.apiService.login({ username, password }).pipe(
      tap((response) => {
        const user = response.user;
        const accessToken = response.accessToken;
        this.handleLoginSuccess(user);
        localStorage.setItem('access_token', accessToken);
        console.log('User Role:', user.role);
      })
    );
  }

  private handleLoginSuccess(user: User): void {
    this.loggedInUserSubject.next(user);
    this.isLoggedInSubject.next(this.isAuthorizedUser(user));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.loggedInUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getLoggedInUser(): User | null {
    return this.loggedInUserSubject.value;
  }

  private isAuthorizedUser(user: User): boolean {
    return user.role === UserRole.Admin || user.role === UserRole.TerminalAgent;
  }

  isPassenger(): boolean {
    const user = this.loggedInUserSubject.value;
    return user?.role === UserRole.Passenger || false;
  }

  getUserId(): string | null {
    return this.userIdSubject.value;
  }
}
