import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { LoginLayoutComponent } from "./layout/login-layout/login-layout.component";
import { LoginComponent } from "./login/login.component";
import { CallRecordComponent } from './pages/call-record/call-record.component';
import { HomeComponent } from './pages/home/home.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketsFormComponent } from './shared/components/tickets-form/tickets-form.component';
import { authGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent },
    ]
  },
  {
    path: 'tickets',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: TicketsComponent },
      { path: 'add/:id', component: TicketsFormComponent },
    ]
  },
  {
    path: 'calls',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: CallRecordComponent },
    ]
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      { path: '', component: LoginComponent},
    ]
  }

];
