import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { User, UserRole } from '../models/user.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  userId: string | undefined;
  user: User = {
    id: '0',
    username: '',
    email: '',
    role: UserRole.Admin,
    profile: {
      fullName: '',
      passportNumber: '',
      address: '',
      phoneNumber: '',
      profilePicture: '',
    },
  };
  userRoles = Object.values(UserRole);
  userForm: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const idFromRoute = params['id'];
      this.userId = idFromRoute;
      if (this.userId !== undefined) {
        this.getUserDetails(this.userId);
      }
    });
  }

  getUserDetails(userId: string): void {
    this.apiService.getUser(userId).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  saveChanges(): void {
    if (this.userId !== undefined) {
      this.apiService.updateUser(this.userId, this.user).subscribe(
        (response) => {
          console.log('User details updated successfully:', response);
        },
        (error) => {
          console.error('Error updating user details:', error);
        }
      );
    } else {
      console.error('Invalid userId');
    }
  }
}
