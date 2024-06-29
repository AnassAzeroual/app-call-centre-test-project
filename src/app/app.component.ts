import { CommonModule } from '@angular/common';
import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule,SharedModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isCollapsed = false;

  ngOnInit() {
   /* // Agent
    sessionStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImFnZW50IiwibmFtZSI6IkFobWVkIFppYW5pIiwiZW1haWwiOiJhLnppYW5pQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.ISqEzbzNQ8mYnq8Pw-0Atyf7vEdPytKmY78cULlviak')
    // Supervisor
    sessionStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6InN1cGVydmlzb3IiLCJuYW1lIjoiQW5hc3MgQXplcm91YWwiLCJlbWFpbCI6ImEuYXplcm91YWxAZ21haWwuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.n_ZvHfk18cvBqWEtYJDZzvUQitTElwvZGCIoQAmRzDo')
*/
  }
}
