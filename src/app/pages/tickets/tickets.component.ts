import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Tickets } from '../../shared/models/tickets.model';
import { SharedModule } from '../../shared/shared.module';
import { TicketsService } from './tickets.service';
import { FormFilterComponent } from '../../shared/components/form-filter/form-filter.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NgIf, NgFor, SharedModule, DatePipe, FormsModule,FormFilterComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {

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
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(Number(data.callId), index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(Number(data.callId), index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Tickets[] = [];
  listOfData: readonly Tickets[] = [];
  setOfCheckedId = new Set<number>();

  constructor(private srv: TicketsService, private router: Router) { }

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
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(Number(item.callId), value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Tickets[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(Number(item.callId)));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(Number(item.callId))) && !this.checked;
  }

  ngOnInit(): void {
    this.srv.getAllTickets().subscribe((res: any) => {
      this.listOfData = res;
    })
  }

  ticketChanged(statusTicket: "En cours" | "Résolu" | "Annulé", data: Tickets) {
    if (!statusTicket) return
    data.ticketStatus = statusTicket;
    this.srv.editTicket(data).subscribe(res => {
    })

  }

  redirectComment(ticketId: number | undefined) {
    this.router.navigate(['/comments', Number(ticketId)]);
  }
}
