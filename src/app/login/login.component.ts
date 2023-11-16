import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    const credentials = {
      username: this.username,
      password: this.password,
    };

    this.apiService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful!');
        console.log('User data:', response.user);
        console.log('Access token:', response.accessToken);

        localStorage.setItem('access_token', response.accessToken);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
