// user-table.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, UtilisateurDTO } from '../../../dashboard/core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModifUserComponent } from '../../../dashboard/modifUser';
import {CardComponent} from "../../../../theme/shared/components/card/card.component";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, CardComponent, FormsModule], // 👈 ajoute CardComponent ici

  standalone: true,
  templateUrl: './user-table.html',
  styleUrls: ['./user-table.scss']
})
export class UserTableComponent implements OnInit {

  utilisateurs: UtilisateurDTO[] = [];

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
  private router: Router // ✅ ici

) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUtilisateurs().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  approveUser(user: UtilisateurDTO): void {
    const modalRef = this.modalService.open(ModifUserComponent, { size: 'lg' });
    modalRef.componentInstance.utilisateur = user;

    modalRef.result.then(
      () => this.loadUsers(),
      (reason) => console.log('Fermeture modal', reason)
    );
  }

  rejectUser(user: UtilisateurDTO): void {
    if (confirm(`Supprimer ${user.email} ?`)) {
      this.userService.deleteUtilisateur(user.id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Erreur suppression', err)
      });
    }
  }

  goToCreateUser(): void {
    this.router.navigate(['/auth/signup']);
  }

  trackById(index: number, item: UtilisateurDTO): number {
    return item.id;
  }

  toggleActivation(user: UtilisateurDTO): void {
    const updatedUser = { ...user, statutActivation: !user.statutActivation };
    this.userService.updateUtilisateur(user.id, updatedUser).subscribe({
      next: () => {
        user.statutActivation = updatedUser.statutActivation;
        console.log(`Statut mis à jour pour ${user.email}`);
      },
      error: (err) => console.error('Erreur lors de la mise à jour du statut', err)
    });
  }

  searchText: string = '';

  get utilisateursFiltres() {
    const search = this.searchText.toLowerCase().trim();
    return this.utilisateurs.filter(u =>
      u.nom?.toLowerCase().includes(search) ||
      u.prenom?.toLowerCase().includes(search) ||
      u.email?.toLowerCase().includes(search) ||
      u.role?.toLowerCase().includes(search)
    );
  }
}
