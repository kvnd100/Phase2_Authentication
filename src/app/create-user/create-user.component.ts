import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  userRoles: string[] = ['Admin', 'Terminal Agent', 'Passenger'];
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordControl = this.userForm.get('password');
    if (passwordControl) {
      const inputType = this.showPassword ? 'text' : 'password';
      passwordControl.setValidators([
        Validators.required,
        Validators.minLength(6),
      ]);
      passwordControl.updateValueAndValidity();
      passwordControl.reset({ value: passwordControl.value, disabled: false });
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.setAttribute('type', inputType);
      }
    }
  }

  createUser() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.apiService.createUser(user).subscribe(
        () => {
          console.log('User created successfully.');

          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }
}
