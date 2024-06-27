import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListNgZorroAntdModule } from './ng-zorro-antd.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListNgZorroAntdModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    ListNgZorroAntdModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule
  ],
  declarations: []
})
export class SharedModule { }
