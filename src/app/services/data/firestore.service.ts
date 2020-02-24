import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Publication } from 'src/app/models/publications.interface';

// test join
import { combineLatest ,pipe, of,  defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AngularFireModule } from '@angular/fire';
import { Contact } from 'src/app/models/contact.interface';


// join par document => Pas top
// export const docJoin = (
//   afs: AngularFirestore,
//   paths: {[ key: string]: string}
// ) => {
//   return source =>
//     defer(() => {
//       let parent;
//       const keys = Object.keys(paths);

//       return source.pipe(
//         switchMap(data => { // data from parent document
//           // save the parent data state
//           parent = data;

//           // match each path to an observable
//           const doc$ = keys.map(k => {
//             const fullPath = `${paths[k]}/${parent[k]}`;
//             return afs.doc(fullPath).valueChanges();
//           });

//           // return combineLatest, it waits for all reads to finish
//           return combineLatest(doc$);
//         }),
//         map(arr => {
//           // We now have all the associated documents
//           // Reduce them to a single object based on the parent's keys
//           const joins = keys.reduce((acc, cur, idx) => {
//             return { ...acc, [cur]: arr[idx]};
//           },{});

//           // Return the parent doc with the joined objects
//           return {...parent, ...joins};
//         })
//       );
//     });
// }


// Join par collection et identifiants identiques : top
export const innerJoin = (
  afs: AngularFirestore,
  field,
  collection,
  limit = 100
) => {
  return source =>
    defer( () => {
      // operator state
      let collectionData;

      // track total num of joined doc reads
      let totaljoins = 0;

      return source.pipe(
        switchMap(data => {
          // clear mapping on each emmited val

          //save the parent data state
          collectionData = data as any[];

          const reads$ = [];
          for (const doc of collectionData){
            // push doc read to array

            if(doc[field]){
              // perform query on join key, with optionnal limit
              const q = ref => ref.where(field, '==' , doc[field]).limit(limit);

              reads$.push(afs.collection(collection, q).valueChanges());
            }else{
              reads$.push(of([]))
            }
          }
          return combineLatest(reads$);
        }),
        map(joins => {
          return collectionData.map((v,i)=>{
            totaljoins += joins[i].length;
            return {...v, [collection]: joins[i] || null};
          });
        }),
        tap(final => {
          console.log(
            `Queried ${(final as any).length}, Joined ${totaljoins} docs`
          );
          totaljoins = 0;
        })
      );
    });
};

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  //savedContacts;
  constructor(public firestore: AngularFirestore) { }



  // creation d'une publication, depuis new-publication page
  createPublication(title_publication: string, description_publication: string): Promise<void> {
    const id_publication = this.firestore.createId();
    const date_publication = new Date();
    const date_modif_publication = date_publication;
    const publication_active = true;

    // console.log(date_publication);
    // console.log(date_modif_publication);
    // console.log(publication_active);

    return this.firestore.doc(`publications/${id_publication}`).set({
      id_publication,
      title_publication,
      date_publication,
      date_modif_publication,
      publication_active,
      description_publication
    });
  }

  modifyPublication(idpub, title_pub, desc_pub){
    const pubDoc = this.firestore.doc<any>('publications/' + idpub);
    const nvDateModif = new Date()
    return new Promise<any>((resolve, reject) => {
      pubDoc.update({
      title_publication: title_pub,
      description_publication: desc_pub,
      date_modif_publication : nvDateModif
      // Other info you want to add here
    })
      .then(
        res => {
          resolve(res)
        },
        err => reject(err))
    });

  }

  // recuperer la liste des publications, depuis publications page
  getPublicationList(): AngularFirestoreCollection<Publication> {
    return this.firestore.collection(`publications`);
  }

  // // recuperer les details d'une publication
  // getPublicationDetail(pubId: string): AngularFirestoreDocument<Publication> {
  //   return this.firestore.collection('publications').doc(pubId);
  // }

    // recuperer les details d'une publication, cette methode permet la manipulation des données depuis le ts
  getPublicationDetail(pubId: string) {
    return this.firestore.collection('publications').doc(pubId);
  }

  getPublicationComments(pubId: string){
    return this.firestore.collection('comments', ref => ref.where('id_elt', '==', pubId))
  }



  getContactList(): AngularFirestoreCollection<Publication> {
    return this.firestore.collection(`users`);
  }

  // setContacts(contacts){
  //   this.savedContacts = contacts;
  //   console.log(this.savedContacts)
  // }

  getContactDetail(contactId: string): AngularFirestoreDocument<Contact> {
    return this.firestore.collection('users').doc(contactId);
  }

  modifyProfil(iduser, value){
    const userDoc = this.firestore.doc<any>('users/' + iduser);
    return new Promise<any>((resolve, reject) => {
      userDoc.update({
      nom_user: value.nom_user,
      prenom_user: value.prenom_user,
      adresse_user_code_postal : value.adresse_user_code_postal,
      adresse_user_localite : value.adresse_user_localite,
      adresse_user_rue : value.adresse_user_rue,
      poste : value.poste
      // Other info you want to add here
    })
      .then(
        res => {
          resolve(res)
        },
        err => reject(err))
    });

  }

  updateUserImage(iduser, urlImage){
    console.log('url image:');
    console.log(urlImage);
    const userDoc = this.firestore.doc<any>('users/' + iduser);
    return new Promise<any>((resolve, reject) => {
      userDoc.update({
      photo_user: urlImage
      // Other info you want to add here
    })
      .then(
        res => {
          resolve(res)
        },
        err => reject(err))
    });
  }

}
