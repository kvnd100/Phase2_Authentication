import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  email: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('Forget Password submitted!');
    console.log('Email:', this.email);

    this.http
      .post('http://localhost:3000/forgot-password', { email: this.email })
      .subscribe(
        (response) => {
          console.log('Password reset email sent successfully!');
        },
        (error) => {
          console.error('Error sending password reset email:', error);
        }
      );
  }
}