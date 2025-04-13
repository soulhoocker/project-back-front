// auth.model.ts
export enum Role {
  GERANT = 'GERANT',
  MODERATEUR = 'MODERATEUR',
  CHAUFFEUR = 'CHAUFFEUR'
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
  id: number;
  login:string;
  nom: string;
  prenom: string;
  email: string;
  role: Role;  // Use the enum directly here
  password: string;  // Add password field
  token: string;
}

