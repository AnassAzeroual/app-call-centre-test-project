import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { differenceInMilliseconds, differenceInMinutes, format } from 'date-fns';
import { SharedModule } from '../../shared/shared.module';

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
  isSubmit: boolean = false;
  constructor(private location: Location) {
    this.callForm = new FormGroup({
      ticket: new FormControl('-'),
      type: new FormControl(''),
      numero: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      heure: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required]),
      sujet: new FormControl(''),
      notes: new FormControl('')
    });
  }

  ngOnInit(): void {

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
    const duration = this.getDurationInHoursMinutesSeconds(endTime, this.startTime)
    console.log(duration);

    this.callForm.patchValue({ duree: duration, date: format(this.startTime, 'yyyy-MM-dd'), heure: format(this.startTime, 'HH:mm:ss') }); // Update form with calculated duration
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.callForm.valid) {
      // const newCallData = new Call(
      //   this.callForm.value.numero,
      //   this.callForm.value.date,
      //   this.callForm.value.duree,
      //   this.callForm.value.heure,
      //   this.callForm.value.ticket,
      //   '',
      //   this.callForm.value.type,
      //   this.callForm.value.sujet,
      //   this.callForm.value.notes,
      //   new Ticket(',','','','','',''),
      //   0,
      // );
      // this.srv.createCall(newCallData)
      //   .subscribe(() => {
      //     console.log('Appel enregistré avec succès!');
      //     // You might want to redirect the user or display a confirmation message
      //   });
    }

  }


  getDurationInHoursMinutesSeconds(startDate: Date, endDate: Date): string {
    // Calculate the difference in milliseconds
    const diffInMilliseconds = differenceInMilliseconds(endDate, startDate);

    // Ensure positive difference
    const absDiffInMilliseconds = Math.abs(diffInMilliseconds);

    // Convert milliseconds to seconds
    const seconds = Math.floor(absDiffInMilliseconds / 1000);

    // Calculate hours and minutes from seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    // Format the output string with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = (seconds % 60).toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  goBack() {
    this.location.back();
  }
}