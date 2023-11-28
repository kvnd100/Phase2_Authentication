import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('access_token')}`,
    });

    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers });
  }

  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('access_token')}`,
    });
    return this.http.post(`${this.apiUrl}/register`, user, { headers });
  }

  updateUser(userId: string, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('access_token')}`,
    });

    return this.http.put(`${this.apiUrl}/users/${userId}`, updatedData, {
      headers,
    });
  }

  deleteUser(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('access_token')}`,
    });

    return this.http.delete(`${this.apiUrl}/users/${userId}`, { headers });
  }

  getUser(userId: string): Observable<User> {
    console.log('getUser method called with userId:', userId);
    const headers = new HttpHeaders({
      Authorization: `${localStorage.getItem('access_token')}`,
    });

    return this.http.get<User>(`${this.apiUrl}/users/${userId}`, { headers });
  }

  getUserDetailsFromToken(token: string): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: token,
    });

    return this.http.get<User>(`${this.apiUrl}/get-user-details`, { headers });
  }
}
