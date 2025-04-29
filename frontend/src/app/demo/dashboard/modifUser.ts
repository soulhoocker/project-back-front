import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateurDTO } from '../dashboard/core/services/user.service';
import { UserService } from '../dashboard/core/services/user.service';
import { Router } from '@angular/router';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'modifUser',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [NgbActiveModal],
  templateUrl: './modifUser.html',
  styleUrls: ['./modifUser.scss']
})
export class ModifUserComponent implements OnInit {
  @Input() utilisateur!: UtilisateurDTO; // Tu peux aussi récupérer l'utilisateur depuis l'URL avec ActivatedRoute si besoin

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.utilisateur?.id],
      nom: [this.utilisateur?.nom || '', Validators.required],
      prenom: [this.utilisateur?.prenom || '', Validators.required],
      email: [this.utilisateur?.email || '', [Validators.required, Validators.email]],
      role: [this.utilisateur?.role || '', Validators.required],
      login: [this.utilisateur?.login || '', Validators.required],
      password: [this.utilisateur?.password || '', Validators.required],
      dateInscription: [this.utilisateur?.dateInscription],
      statutActivation: [this.utilisateur?.statutActivation || false]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const updatedUser: UtilisateurDTO = this.form.value;
      this.userService.updateUtilisateur(updatedUser.id, updatedUser).subscribe({
        next: (res) => {
          console.log('Utilisateur mis à jour avec succès', res);
          this.router.navigate(['/dashboard']); // Redirection vers tableau de bord ou autre page
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de l’utilisateur', err);
        }
      });
    }
  }

  cancel(): void {
    this.activeModal.dismiss(); // ✅ Ferme proprement la modal
  }
}
