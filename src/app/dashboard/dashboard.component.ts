import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  constructor(
    private router: Router,
    public authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isLoading = false;
      }
    );
  }

  editUser(userId: string) {
    this.router.navigate(['/details', userId]);
  }

  deleteUser(userId: string) {
    console.log(`Delete user with ID: ${userId}`);
  }
}
