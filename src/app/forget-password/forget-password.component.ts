import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  email: string = '';

  onSubmit() {
    console.log('Forget Password submitted!');
    console.log('Email:', this.email);
  }
}
