import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user$ = this.authService.loggedInUser$;
  profileForm!: FormGroup;
  isEditing = false;
  userId!: string;
  userProfile: any;
  loading = false;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.authService.initializeAuth();
    this.initializeForm();
    this.authService.initializationComplete$.subscribe((initialized) => {
      if (initialized) {
        this.userId = this.authService.getUserId() || '';
        console.log(this.userId);

        this.loadUserProfile();
      }
    });
  }

  enableEdit() {
    this.isEditing = true;
    this.profileForm.enable();
  }

  async saveChanges() {
    try {
      this.loading = true;
      const updatedProfile = this.profileForm.value;
      await this.apiService
        .updateUserProfile(this.userId, updatedProfile)
        .toPromise();
      this.loadUserProfile();
      this.profileForm.disable();
      this.isEditing = false;
    } catch (error) {
      console.error('Error updating user profile:', error);
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
  private loadUserProfile() {
    this.loading = true;

    forkJoin({
      user: this.apiService.getUser(this.userId),
      userProfile: this.apiService.getUserProfile(this.userId),
    }).subscribe(
      ({ user, userProfile }) => {
        this.userProfile = userProfile;
        this.profileForm.patchValue(userProfile);

        if (user) {
          this.profileForm.patchValue({
            username: user.username,
            email: user.email,
          });

          this.user$ = of({
            ...user,
            email: user.email,
            username: user.username,
          });
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      },
      () => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    );
  }

  private uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('profilePicture', file);
    this.apiService.updateUserProfile(this.userId, formData).subscribe(
      (response) => {
        const updatedProfile = response;

        this.profileForm.patchValue(updatedProfile);
      },

      (error) => {
        console.error('Error updating profile picture:', error);
      },
      () => {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    );
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
      this.uploadProfilePicture(file);
    }
  }
}
