import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedService } from '../../shared/services/shared.service';
import { ListNgZorroAntdModule } from '../../shared/list-ng-zorro-antd.module';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NzIconModule, NzLayoutModule, NzMenuModule,ListNgZorroAntdModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  isCollapsed = false;
  userConnected: any;
  constructor(private srvShared: SharedService) {
    this.userConnected = this.srvShared.getUser();
  }

  logout(){
    this.srvShared.logoutUser();
  }
}
