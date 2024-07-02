import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedService } from '../../shared/services/shared.service';
import { SharedModule } from '../../shared/shared.module';
import { DashboardService } from './dashboard.service';
import {NzPopoverDirective} from "ng-zorro-antd/popover";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NzIconModule, NzLayoutModule, NzMenuModule, SharedModule, NzPopoverDirective],
  providers: [],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent implements OnInit {
  isCollapsed = false;
  userConnected: any;
  notifications: any[] = [];
  constructor(private srvShared: SharedService, private srv: DashboardService) {
    this.userConnected = this.srvShared.getUser();
  }

  ngOnInit(): void {
    // this.socket.on('message', (message: string) => {
    //   this.notifications.push(message);
    // });
    this.getNotifications()
  }

  logout() {
    this.srvShared.logoutUser();
  }

  getNotifications() {
    this.srv.getMessages().subscribe((data: any) => {
      this.notifications.push(data);
    });
  }
}
