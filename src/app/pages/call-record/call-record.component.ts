import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { differenceInMilliseconds, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { SharedModule } from '../../shared/shared.module';
import { TicketsService } from '../tickets/tickets.service';
import { CallsService } from '../home/calls.service';
import { Calls } from '../../shared/models/calls.model';
import { Tickets } from '../../shared/models/tickets.model';
import { SharedService } from '../../shared/services/shared.service';
import { Users } from '../../shared/models/users.model';

@Component({
  selector: 'app-call-record',
  standalone: true,
  imports: [NgIf, NgFor, SharedModule],
  templateUrl: './call-record.component.html',
  styleUrls: ['./call-record.component.scss']
})
export class CallRecordComponent implements OnInit {
  callForm!: FormGroup;
  ticketForm!: FormGroup;
  callStarted: boolean = false;
  startTime!: Date;
  isSubmitCallForm: boolean = false;
  isSubmitTicketForm: boolean = false;
  isTicketZone = false;
  listAgents: Users[] = [];
  constructor(private location: Location, private srvTicket: TicketsService, private srvCalls: CallsService, private srvShared: SharedService) {
    this.callForm = new FormGroup({
      type: new FormControl('',[Validators.required]),
      numero: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      heure: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required]),
    });

    this.ticketForm = new FormGroup({
      callId: new FormControl('', [Validators.required]),
      ticketStatus: new FormControl('', [Validators.required]),
      sujet: new FormControl('', [Validators.required]),
      associateTo : new FormControl(null),
    });

  }

  ngOnInit(): void { }

  showTicketZone() {
    this.isTicketZone = true;
    this.srvShared.getAgents().subscribe((res:any) => {
      this.listAgents = res;
      // this.ticketForm.get('associateTo')?.setValue(res);
    })
  }
  get form() {
    return this.callForm.controls;
  }
  get formTicket() {
    return this.ticketForm.controls;
  }

  onStartCall() {
    this.startTime = new Date();
    this.callStarted = true;
  }

  onEndCall() {
    this.callStarted = false;
    const endTime = new Date();
    const duration = differenceInSeconds(endTime, this.startTime)
    console.log(duration);

    this.callForm.patchValue({ duree: duration, date: format(this.startTime, 'yyyy-MM-dd'), heure: format(this.startTime, 'HH:mm:ss') }); // Update form with calculated duration
  }

  onSubmitCall() {
    this.isSubmitCallForm = true;
    if (this.callForm.valid) {
      console.log(this.callForm.value);
      let data: Calls = {
        callType: this.callForm.get('type')?.value,
        phoneNumber: this.callForm.get('numero')?.value,
        callDate: new Date(this.callForm.get('date')?.value),
        callDuration: this.callForm.get('duree')?.value,
      } as Calls;
      this.srvCalls.createCall(data).subscribe(res => {
        this.callForm.reset();
        this.isSubmitCallForm = false;
        this.ticketForm.get('callId')?.setValue(res.callId);
        this.ticketForm.get('ticketStatus')?.setValue('En cours');
      })
    }
  }
  onSubmitTicket() {
    this.isSubmitTicketForm = true;
    console.log(this.ticketForm);
    if (this.ticketForm.valid) {
      let data: Tickets = {
        callId: this.ticketForm.get('callId')?.value,
        issueDescription: this.ticketForm.get('sujet')?.value,
        ticketStatus: this.ticketForm.get('ticketStatus')?.value,
        createdByUserId: this.srvShared.getUser()?.id,
        assignedToUserId: this.ticketForm.get('associateTo')?.value,
      }
      this.srvTicket.createTicket(data).subscribe(res => {
        console.log(res)
        this.ticketForm.reset();
        this.isSubmitTicketForm = false;
      })
    }
  }

  goBack() {
    this.location.back();
  }
}