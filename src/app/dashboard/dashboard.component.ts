import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
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

  constructor(private router: Router) {}

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
