import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  showDeleteModel: boolean = false;
  userToDeleteId: string | null = null;
  modalRef: MdbModalRef<DeleteModalComponent> | null = null;
  constructor(
    private router: Router,
    public authService: AuthService,
    private apiService: ApiService,
    private modalService: MdbModalService
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

  navigateToCreateUser() {
    this.router.navigate(['/create-user']);
  }

  openModal(userId: string) {
    this.userToDeleteId = userId;
    this.modalRef = this.modalService.open(DeleteModalComponent, {
      data: {
        title: 'Delete Confirmation',
        text: 'Are you sure?',
        isDangerButton: true,
      },
    });
    this.modalRef.component.confirmDelete.subscribe(() => {
      if (this.userToDeleteId) {
        this.apiService.deleteUser(this.userToDeleteId).subscribe(
          () => {
            this.loadUsers();
            console.log('User deleted successfully.');
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }
}