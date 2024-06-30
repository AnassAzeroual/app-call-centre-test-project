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
  callStarted: boolean = false;
  startTime!: Date;
  isSubmitCallForm: boolean = false;
  isTicketZone = false;
  callId!:number;
  constructor(private location: Location, private srvCalls: CallsService, private srvShared: SharedService) {
    this.callForm = new FormGroup({
      type: new FormControl('',[Validators.required]),
      numero: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      heure: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void { }

  showTicketZone() {
    this.isTicketZone = true;
  }
  get form() {
    return this.callForm.controls;
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
        if (res.callId) {
          this.callId = Number(res.callId);
        }
      })
    }
  }
  

  goBack() {
    this.location.back();
  }
}