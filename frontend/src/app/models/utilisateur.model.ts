export interface UtilisateurDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;

  // 🔽 ajoute celles-ci :
  login: string;
  password: string;
  dateInscription: string; // ou Date si tu les gères comme objets Date
  statutActivation: boolean;
}
