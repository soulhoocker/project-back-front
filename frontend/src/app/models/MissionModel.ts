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
  notifications?: Notification[];
  facture?: Facture;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trajet {
  id: string;
  depart: string;
  arrivee: string;
  distance: number;
  dureeMoyenne: number;
  zoneId: string;
  zone?: Zone;
  clientId: string;
  client?: Client;
}

export interface Bus {
  id: string;
  immatriculation: string;
  modele: string;
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
  id: string;
  nom: string;
  tarifParKm: number;
  trajets?: Trajet[];
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
  nom: string;
  trajets?: Trajet[];
}
