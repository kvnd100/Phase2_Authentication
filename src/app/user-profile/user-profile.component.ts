import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user$ = this.authService.loggedInUser$;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initializeAuth();
  }

  enableEdit() {
    console.log('edit profile');
  }
}
