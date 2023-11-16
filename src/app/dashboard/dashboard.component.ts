import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [
    { id: 1, name: 'Admin', email: 'admin@test.com', role: UserRole.Admin },
    {
      id: 2,
      name: 'Terminal Agent',
      email: 'terminal@test.com',
      role: UserRole.TerminalAgent,
    },
    {
      id: 3,
      name: 'Passenger',
      email: 'passenger@test.com',
      role: UserRole.Passenger,
    },
  ];

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      console.log('Is Logged In:', isLoggedIn);
    });
  }

  editUser(userId: number) {
    console.log(`Edit user with ID: ${userId}`);
    this.router.navigate(['/details', userId]);
  }

  deleteUser(userId: number) {
    console.log(`Delete user with ID: ${userId}`);
  }

  createUser() {
    console.log('Navigate to user creation page');
  }
}
