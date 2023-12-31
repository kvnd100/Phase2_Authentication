import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;
  isSidebarOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack(): void {
    this.location.back();
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
