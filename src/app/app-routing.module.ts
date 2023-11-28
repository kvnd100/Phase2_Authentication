import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './auth/auth.guard';
import { PasswordResetComponentComponent } from './password-reset-component/password-reset-component.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FlightManagementComponent } from './flight-management/flight-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        canActivate: [AuthGuard],
      },
      { path: 'reset-password', component: PasswordResetComponentComponent },
      {
        path: 'create-user',
        component: CreateUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'flight-management',
        component: FlightManagementComponent,
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
