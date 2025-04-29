// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, UtilisateurDTO } from '../dashboard/core/services/user.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModifUserComponent } from '../dashboard/modifUser';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router"; // ajuste le chemin si besoin

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sales = [
    { label: 'This Week', amount: '6,523', percentage: '+5%' },
    { label: 'Last Week', amount: '6,123', percentage: '-2%' }
  ];

  // Cartes statistiques (exemple)
  card = [
    { icon: 'users', title: 'Users', value: 125 },
    { icon: 'truck', title: 'Transports', value: 87 },
    { icon: 'file-text', title: 'Missions', value: 32 }
  ];

  // Réseaux sociaux (exemple)
  social_card = [
    { platform: 'Facebook', followers: '3.2K' },
    { platform: 'Twitter', followers: '1.1K' },
    { platform: 'Instagram', followers: '2.5K' }
  ];

  // Liste de progression (exemple)
  progressing = [
    { title: 'Missions', percent: 75 },
    { title: 'Buses Disponibles', percent: 50 },
    { title: 'Chauffeurs Actifs', percent: 90 }
  ];
  utilisateurs: UtilisateurDTO[] = [];

  constructor(
    private userService: UserService,
    private modalService: NgbModal
// ici
  ) {}
  ngOnInit(): void {

  }





}
