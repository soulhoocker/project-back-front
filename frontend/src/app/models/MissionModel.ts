// src/app/models/mission.model.ts
export interface Mission {
  id: string;
  trajetId: string;
  trajet?: Trajet;
  busId: string;
  bus?: Bus;
  chauffeurId: string;
  chauffeur?: Chauffeur;
  clientId: string;
  client?: Client;
  dateHeureDepart: Date;
  dateHeureArrivee: Date;
  statut: 'planifié' | 'en_cours' | 'terminé' | 'annulé';
  localisation?: Localisation;
  incidents?: Incident[];
  exceptions?: ExceptionMission[];
  execution?:ExecutionMission[];
  notifications?: Notification[];
  facture?: Facture;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trajet {
  id: number;
  libelletTrajet: string;          // Updated to match the backend field

  dateDemarrageContrat: string;    // Use string or Date based on how the date is handled in the frontend
  dateFinContrat: string;          // Use string or Date based on how the date is handled in the frontend
  distanceMoyenne: number;
  dureeMoyenne: number;
  typeTarification: string;
  coutKm:number;
  montantForfaitaire:number
  zoneId: string;
  zone?: { id: number, designation: string };
  client?: { id: number, libelletClient: string };
  bus?: { id: number};

}

export interface Bus {
  id: number;
  immatriculation: string;
  marqueModel: string;
  capacite: number;
  kilometrage: number;
  etat: string;
  disponibilites?: DispoBus[];
}

export interface DispoBus {
  id: number;
  busId: number;
  dateDebutIndisponibilite: Date;
  dateFinIndisponibilite: Date;
  descriptionIndisponibilite: string;
}

export interface Chauffeur {
  id: number;
  idPermis: string;
  typePermis: string[];
  dateValiditePermis: Date;
  disponibilite: boolean;
  etatCivile: string;
  note: number;
  role: string;
  disponibilites: DispoChauffeur[];
}

export interface DispoChauffeur {
  id: number;
  chauffeurId: number;
  dateDebutIndisponibilite: Date;
  dateFinIndisponibilite: Date;
  descriptionIndisponibilite: string;
}

export interface Client {
  id: number;
  libelletClient: string;
  mailClient: string;
  telephoneClient: string;
  adresseClient: string;
  matriculeFiscale: string;
  zoneAction: string;
  chiffreAffaire: number;
}

export interface Localisation {
  id: string;
  missionId: string;
  latitude: number;
  longitude: number;
  horodatage: Date;
}

export interface Incident {
  id: string;
  missionId: string;
  description: string;
  gravite: 'mineur' | 'majeur' | 'critique';
  resolu: boolean;
}

export interface ExceptionMission {
  id: string;
  missionId: string;
  raison: string;
  details: string;
}

export interface Facture {
  id: string;
  missionId: string;
  montant: number;
  payee: boolean;
  dateEmission: Date;
}

export interface Notification {
  id: string;
  missionId: string;
  message: string;
  lue: boolean;
  type: 'info' | 'alerte' | 'urgence';
}

export interface Zone {
  id: string;
  designation: string;
  trajets?: Trajet[];
}
export interface ExecutionMission {
  id: number; // Corresponding to Long in Java
  dateHeureDepartReel: string; // ISO string representation for LocalDateTime
  dateHeureArriveReel: string; // ISO string representation for LocalDateTime
  statutExecution: string;
  revenus: number;
  missionId: number; // Corresponding to Long in Java
  localisationId: number; // Corresponding to Long in Java
  factureId: number; // Corresponding to Long in Java
}

