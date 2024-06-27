import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListNgZorroAntdModule } from '../../list-ng-zorro-antd.module';
import { Location } from '@angular/common';

@Component({
  selector: 'shared-tickets-form',
  templateUrl: './tickets-form.component.html',
  styleUrls: ['./tickets-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ListNgZorroAntdModule],
})
export class TicketsFormComponent implements OnInit {

  ticketForm!: FormGroup;
  formType!:string;
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.formType = this.route.snapshot.queryParamMap.get('type')==='add' ? 'Création': 'Modification';
    const id = this.route.snapshot.paramMap.get('id');

    // how to get the query name type from url 
    this.ticketForm = new FormGroup({
      id: new FormControl(id, [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      sujet: new FormControl('', [Validators.required]),
      ticket: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    const ticketData = this.ticketForm.value;
    console.log(ticketData);
    // this.ticketService.createTicket(ticketData)
    //   .subscribe((res: any) => {
    //     console.log(res);

    //     // Handle successful ticket creation
    //     console.log('Ticket créé avec succès!');
    //     // You might want to redirect the user or display a confirmation message
    //   }, error => {
    //     console.error('Erreur lors de la création du ticket:', error);
    //     // Handle error scenarios
    //   });
  }
  goBack() {
    this.location.back();
  }
}