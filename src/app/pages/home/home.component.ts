import { DatePipe, NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CallService } from "../../shared/services/call.service";
import { Call } from "../../shared/models/call.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor,SharedModule,DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(Number(data.id), index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(Number(data.id), index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Call[] = [];
  listOfData: readonly Call[] = [];
  setOfCheckedId = new Set<number>();

  constructor(private srv:CallService){}

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(Number(item.id), value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Call[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(Number(item.id)));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(Number(item.id))) && !this.checked;
  }

  ngOnInit(): void {
    this.srv.getAllCalls().subscribe((res:any) => {
      this.listOfData = res;
    })
  }
}
