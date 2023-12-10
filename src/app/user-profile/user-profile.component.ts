import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user$ = this.authService.loggedInUser$;
  profileForm!: FormGroup;
  isEditing = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
    this.authService.initializeAuth();
    this.initializeForm();
  }

  enableEdit() {
    this.isEditing = true;
    this.profileForm.enable();
  }

  saveChanges() {
    this.profileForm.disable();
    this.isEditing = false;
  }

  private initializeForm() {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }],
      fullName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      passportNumber: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      phoneNumber: [{ value: '', disabled: true }],
      profilePicture: [''],
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileForm
        .get('profilePicture')
        ?.setValue(URL.createObjectURL(file));
    }
  }
}
