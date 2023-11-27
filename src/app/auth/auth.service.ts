import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { User, UserRole } from '../models/user.model';

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

  constructor(private apiService: ApiService) {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      this.handleLoginSuccess(storedToken);
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.apiService.login({ username, password }).pipe(
      tap((response) => {
        const user = response.user;
        const accessToken = response.accessToken;
        this.handleLoginSuccess(accessToken);
        this.loggedInUserSubject.next(user);
        console.log('User Role:', user.role);
      })
    );
  }

  private handleLoginSuccess(accessToken: string): void {
    localStorage.setItem('access_token', accessToken);
    this.isLoggedInSubject.next(true);
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
}
