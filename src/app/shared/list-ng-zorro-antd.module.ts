import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {NzTableComponent, NzTdAddOnComponent, NzThSelectionComponent} from "ng-zorro-antd/table";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';

const listAnt = [
  NzBreadCrumbModule,
  NzTableComponent,
  NzThSelectionComponent,
  NzTdAddOnComponent,
  NzDropDownModule,
  NzButtonModule,
  NzIconModule,
  NzToolTipModule,
  NzModalModule,
  NzSelectModule,
  NzNotificationModule,
  NzTagModule
];

@NgModule({
  imports: [...listAnt],
  exports: [...listAnt],
  providers:[]
})
export class ListNgZorroAntdModule {

}