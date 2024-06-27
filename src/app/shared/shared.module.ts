import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { ListNgZorroAntdModule } from './list-ng-zorro-antd.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketsFormComponent } from './components/tickets-form/tickets-form.component';
import { RouterLink } from '@angular/router';

const components = [
  TicketsFormComponent
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
  exports:[
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
