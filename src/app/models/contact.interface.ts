export interface Contact {
  id_user: number;
  nom_user: string;
  prenom_user: string;
  adresse_mail: string;
  id_localisation: number;
  id_type_user: number;
  photo_user: string;
  adresse_user_rue: string;
  adresse_user_code_postal: string;
  adresse_user_localite: string;
  user_actif: boolean;
  poste: string;
  notif_user_pub: boolean;
  notif_user_evnt: boolean;
}
