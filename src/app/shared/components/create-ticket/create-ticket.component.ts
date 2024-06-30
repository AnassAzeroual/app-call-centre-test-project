import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tickets } from '../../models/tickets.model';
import { SharedService } from '../../services/shared.service';
import { TicketsService } from './../../../pages/tickets/tickets.service';
import { ListNgZorroAntdModule } from '../../list-ng-zorro-antd.module';
import { Users } from '../../models/users.model';
import { NgIf } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, ListNgZorroAntdModule,NgIf],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  @ViewChild('notificationBtnTpl', { static: false }) template?: TemplateRef<{}>;
  callId!:number;
  @Input('callId') set newCallId(callId:number){
    this.callId = callId;
    this.ticketForm.patchValue({callId:callId})
    console.log(callId);
    
  } 
  ticketForm!: FormGroup;
  isSubmitTicketForm: boolean = false;
  listAgents: Users[] = [];

  constructor(private srvShared: SharedService, private srvTicket: TicketsService,private srvNotification: NzNotificationService) {
    this.ticketForm = new FormGroup({
      callId: new FormControl(this.callId, [Validators.required]),
      ticketStatus: new FormControl('', [Validators.required]),
      sujet: new FormControl('', [Validators.required]),
      associateTo: new FormControl(null),
    });
  }
  get formTicket() {
    return this.ticketForm.controls;
  }
  ngOnInit() {
    this.srvShared.getAgents().subscribe((res:any) => {
      this.listAgents = res;
    })
  }

  onSubmitTicket() {
    this.isSubmitTicketForm = true;
    if (this.ticketForm.valid) {
      let data: Tickets = {
        callId: this.callId,
        issueDescription: this.ticketForm.get('sujet')?.value,
        ticketStatus: this.ticketForm.get('ticketStatus')?.value,
        createdByUserId: this.srvShared.getUser()?.id,
        assignedToUserId: this.ticketForm.get('associateTo')?.value,
      }
      this.srvTicket.createTicket(data).subscribe(res => {
        this.ticketForm.reset();
        this.isSubmitTicketForm = false;
        this.srvNotification.success(
          'Ticket succès',
          'Le ticket est créé avec succès.',
        );
      })
    }
  }

}
