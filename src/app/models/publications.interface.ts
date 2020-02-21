export interface Publication {
  id_publication: string;
  id_user: string;
  title_publication: string;
  date_publication: Date;
  date_modif_publication: Date;
  publication_active: boolean;
  nb_like_publication: number;
  nb_dislike_publication: number;
  publication_photo_1: string;
  publication_photo_2: string;
  publication_photo_3: string;
  description_publication: string;
}
