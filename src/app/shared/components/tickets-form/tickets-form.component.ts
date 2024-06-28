import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListNgZorroAntdModule } from '../../list-ng-zorro-antd.module';
import { CallService } from '../../services/call.service';

@Component({
  selector: 'shared-tickets-form',
  templateUrl: './tickets-form.component.html',
  styleUrls: ['./tickets-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ListNgZorroAntdModule],
})
export class TicketsFormComponent implements OnInit {

  ticketForm!: FormGroup;
  formType!: string;
  id: number = 0;
  constructor(private route: ActivatedRoute, private location: Location, private srvCall: CallService) {
    this.formType = this.route.snapshot.queryParamMap.get('type') === 'add' ? 'Création' : 'Modification';
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketForm = new FormGroup({
      id: new FormControl(this.id, [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      sujet: new FormControl('', [Validators.required]),
      ticket: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.srvCall.getCallById(this.id).subscribe((res: any) => {
      console.log(res);

      this.ticketForm.patchValue({
        id: this.id,
        nom: '',
        email: '',
        sujet: '',
        ticket: res.status,
        description: '',
      })
    })

  }

  onSubmit() {
    const ticketData = this.ticketForm.value;
    console.log(ticketData);
    if (this.formType === 'Création') {
      this.srvCall.createCall(ticketData)
        .subscribe((res: any) => {
          console.log(res);
        });
    } else {
      this.srvCall.updateCall(this.id, ticketData)
        .subscribe((res: any) => {
          console.log(res);
        });
    }
  }

  goBack() {
    this.location.back();
  }
}