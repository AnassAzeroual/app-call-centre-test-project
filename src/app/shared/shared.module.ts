import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CreateTicketComponent } from './components/create-ticket/create-ticket.component';
import { FormFilterComponent } from './components/form-filter/form-filter.component';
import { TicketsFormComponent } from './components/tickets-form/tickets-form.component';
import { ListNgZorroAntdModule } from './list-ng-zorro-antd.module';

const components = [
  TicketsFormComponent,
  CreateTicketComponent,
  FormFilterComponent
]
@NgModule({
  imports: [
    ReactiveFormsModule,
    ListNgZorroAntdModule,
    ScrollingModule,
    DragDropModule,
    RouterLink,
    ...components
  ],
  exports: [
    ReactiveFormsModule,
    ListNgZorroAntdModule,
    ScrollingModule,
    DragDropModule,
    RouterLink,
    ...components
  ],
  declarations: []
})
export class SharedModule { }
