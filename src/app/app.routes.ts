import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { TicketsComponent } from './pages/tickets/tickets.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/tickets' },
  { 
    path: 'accueil',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: HomeComponent }, // Use relative paths within the layout
      // { path: 'about', component: AboutComponent } // Reuse AboutComponent (optional)
    ]
  },
  { 
    path: 'tickets',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: TicketsComponent }, // Use relative paths within the layout
      // { path: 'about', component: AboutComponent } // Reuse AboutComponent (optional)
    ]
  }

];
