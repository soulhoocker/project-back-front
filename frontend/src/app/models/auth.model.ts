// auth.model.ts
export enum Role {
  GERANT = 'GERANT',
  MODERATEUR = 'MODERATEUR',
  CHAUFFEUR = 'CHAUFFEUR'
}
export interface Utilisateur {
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


export interface LoginRequest {
  login: string;
  password: string;
}

export interface AuthResponseDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;  // Still using string for role since Role enum is string-based
  token: string;
}

export interface RegisterRequest {
  id: number; // The user's ID
  login: string; // User's login
  nom: string; // User's last name
  prenom: string; // User's first name
  email: string; // User's email
  role: Role; // User's role (use the enum directly here)
  password: string; // User's password
  idPermis: string; // ID of the driving license (for CHAUFFEUR role)
  typePermis: string; // Type of the driver's license (for CHAUFFEUR role)
  dateValiditePermis: Date; // Expiry date of the driver's license (for CHAUFFEUR role)
  disponibilite: boolean; // Driver's availability (for CHAUFFEUR role)
  etatCivile: string; // Marital status (for CHAUFFEUR role)
  token: string; // Token, potentially for JWT
}




