import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset-component.component.html',
  styleUrls: ['./password-reset-component.component.scss'],
})
export class PasswordResetComponentComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  resetToken: string = '';
  errorMessage: string = '';
  resetSuccess: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.route.queryParams.subscribe((params) => {
      this.resetToken = params['token'];
    });
  }

  onSubmit() {
    this.http
      .post('http://localhost:3000/reset-password', {
        token: this.resetToken,
        newPassword: this.newPassword,
      })
      .subscribe(
        (response) => {
          console.log('Password reset successful!');
          this.resetSuccess = true;
          this.newPassword = '';
          this.confirmPassword = '';
        },
        (error) => {
          console.error('Error resetting password:', error);
          this.errorMessage = 'Error resetting password. Please try again.';
        }
      );
  }
}
