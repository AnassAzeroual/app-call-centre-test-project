import { NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

interface ICall {
  id: number;
  numero: string;
  date: string;
  heure: string;
  duree: string;
  typeAppel: string;
  statut: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor,SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ICall[] = [];
  listOfData: readonly ICall[] = [];
  setOfCheckedId = new Set<number>();

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
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ICall[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.listOfData = [
        { id:1,numero: '+33 1 23 45 67 89', date: '2024-06-27', heure: '14:32', duree: '03:21', typeAppel: 'Entrant', statut: 'Répondu' },
        { id:2,numero: '+33 4 56 78 90 12', date: '2024-06-26', heure: '11:45', duree: '02:14', typeAppel: 'Manqué', statut: '-' },
        { id:3,numero: '+33 7 89 01 23 45', date: '2024-06-25', heure: '10:23', duree: '05:43', typeAppel: 'Sortant', statut: 'En cours' },
        { id:4,numero: '+33 6 54 32 10 98', date: '2024-06-24', heure: '17:12', duree: '01:39', typeAppel: 'Entrant', statut: 'Résolu' },
        { id:5,numero: '+33 2 34 56 78 90', date: '2024-06-23', heure: '09:56', duree: '04:22', typeAppel: 'Sortant', statut: 'Annulé' },
    ]
  }
}
