import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListNgZorroAntdModule } from '../../list-ng-zorro-antd.module';

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
  constructor(private route: ActivatedRoute, private location: Location) {
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

  ngOnInit(): void {}

  onSubmit() {}

  goBack() {
    this.location.back();
  }
}