import { User, UserRole } from '../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  userId!: number;
  user: User = { id: 0, name: '', email: '', role: UserRole.Admin };
  userRoles = Object.values(UserRole);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      this.user = this.getUserDetails(this.userId);
    });
  }

  getUserDetails(userId: number): User {
    return {
      id: userId,
      name: 'Admin',
      email: 'Admin@test.com',
      role: UserRole.Admin,
    };
  }
}
