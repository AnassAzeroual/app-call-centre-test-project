import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Tickets } from '../../models/tickets.model';
import { SharedService } from '../../services/shared.service';
import { TicketsService } from './../../../pages/tickets/tickets.service';
import { ListNgZorroAntdModule } from '../../list-ng-zorro-antd.module';
import { Users } from '../../models/users.model';
import { Location, NgIf } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, ListNgZorroAntdModule, NgIf],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  @ViewChild('notificationBtnTpl', { static: false })
  template?: TemplateRef<{}>;
  callId!: number;
  @Input('callId') set newCallId(callId: number) {
    this.callId = callId;
    this.ticketForm.patchValue({ callId: callId });
  }
  ticketForm!: FormGroup;
  isSubmitTicketForm: boolean = false;
  listAgents: Users[] = [];

  constructor(
    private srvShared: SharedService,
    private srvTicket: TicketsService,
    private srvNotification: NzNotificationService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.ticketForm = new FormGroup({
      callId: new FormControl(this.callId, [Validators.required]),
      ticketStatus: new FormControl('', [Validators.required]),
      sujet: new FormControl('', [Validators.required]),
      associateTo: new FormControl(this.srvShared.getUser()?.id),
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.callId = Number(this.route.snapshot.paramMap.get('id'));
      this.ticketForm.patchValue({ callId: this.callId });
    }
  }
  get formTicket() {
    return this.ticketForm.controls;
  }
  ngOnInit() {
    this.srvShared.getAgents().subscribe((res: any) => {
      this.listAgents = res;
    });
  }

  goBack()
  {
    this.location.back();
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
      };
      this.srvTicket.createTicket(data).subscribe((res) => {
        this.ticketForm.get('ticketStatus')?.setValue('');
        this.ticketForm.get('sujet')?.setValue('');
        this.ticketForm.get('associateTo')?.setValue(null);
        this.isSubmitTicketForm = false;
        this.srvShared.notification(
          'success',
          'Ticket succès',
          'Le ticket est créé avec succès.'
        );
      });
    }
  }
}
