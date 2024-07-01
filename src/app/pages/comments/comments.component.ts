import { NgIf, NgFor, JsonPipe, DatePipe, NgClass, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TicketComments } from '../../shared/models/ticketComments.model';
import { TicketsService } from '../tickets/tickets.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Tickets } from '../../shared/models/tickets.model';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [NgIf, NgFor, SharedModule,ReactiveFormsModule,JsonPipe,DatePipe,NgClass],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  comments: TicketComments[] = [];
  ticketId!: number;
  formTicketComments: FormGroup;
  ticket!: Tickets;
  isSubmitted: boolean = false;

  constructor(private ticketService: TicketsService, private route: ActivatedRoute,private location: Location,private srvShared: SharedService) {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));
    this.formTicketComments = new FormGroup({
      ticketId: new FormControl(this.ticketId, [Validators.required]),
      commentText: new FormControl('', [Validators.required,Validators.minLength(3)]),
      commentedByUserId: new FormControl('', [Validators.required]),
    });
  }
  
  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.formTicketComments.patchValue({ ticketId: this.ticketId,commentText:'',commentedByUserId:this.srvShared.getUser()?.id });
    }
    this.loadTicket();
    this.loadComments();
  }

  get form(){
    return this.formTicketComments.controls;
  }

  goBack()
  {
    this.location.back();
  }

  loadComments() {
    this.ticketService.getTicketComments(this.ticketId).subscribe((comments: TicketComments[]) => this.comments = comments);
  }

  private loadTicket() {
    this.ticketService.getTicketById(this.ticketId).subscribe((ticket: Tickets) => this.ticket = ticket);
  }

  onSubmit() {
    console.log('is here');
    
    this.isSubmitted = true;
    if(!this.formTicketComments.valid) return
    let data: TicketComments = {
      ticketId: Number(this.formTicketComments.get('ticketId')?.value),
      commentDate: new Date(),
      commentText: this.formTicketComments.get('commentText')?.value,
      commentedByUserId: Number(this.formTicketComments.get('commentedByUserId')?.value)
    }
    this.ticketService.addTicketComment(data)
      .subscribe(() => {
        this.isSubmitted = false;
        this.formTicketComments.get('commentText')?.setValue('')
        this.loadComments()
      });
  }

}
