import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Publication } from 'src/app/models/publications.interface';

// test join
import { combineLatest ,pipe, of,  defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { AngularFireModule } from '@angular/fire';
import { Contact } from 'src/app/models/contact.interface';
import { AuthenticationService } from '../authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { resolve } from 'q';


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
          // console.log(collectionData) // liste des documents
          const reads$ = [];
          for (const doc of collectionData){
            // push doc read to array
            // console.log(doc) // liste des documents
            if(doc[field]){
              // perform query on join key, with optionnal limit
              const q = ref => ref.where(field, '==' , doc[field]).limit(limit);

              // reads$.push(afs.collection(collection, q).valueChanges());
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
  constructor(public firestore: AngularFirestore,
    private authsrv: AuthenticationService,
    private storage: AngularFireStorage) { }

  // PARTIE PUBLICATIONS

    // creation d'une publication, depuis new-publication page
    createPublication(title_publication: string, description_publication: string, imageId, fileRaw): Promise<void> {
      const id_publication = this.firestore.createId();
      const filePath = '/Image/' + 'Post_' + id_publication + '/' + imageId ;
      const result = this.SaveImageRef(filePath, fileRaw);
      const ref = result.ref;
      const date_publication = new Date();
      const date_modif_publication = date_publication;
      const publication_active = true;
      
      return result.task.then(a => {
        ref.getDownloadURL().subscribe(a => {
          //  console.log(a)
          return this.authsrv.getCurrentUserId().then(res => {
            const id_user = res.uid;

            return this.firestore.doc(`publications/${id_publication}`).set({
              id_publication,
              title_publication,
              date_publication,
              date_modif_publication,
              publication_active,
              description_publication,
              id_user,
              'photo_publication':a
            });

          })
          .catch(error => {
            console.log(error)
          })
        });
      })
    }



    SaveImageRef(filePath, file) {
    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
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
    getPublicationList(){ //: AngularFirestoreCollection<Publication> {
     // return this.firestore.collection('publications');
     
     // arrive a trier par date avec :
      return this.firestore.collection('publications', ref => ref.orderBy('date_publication', 'desc')).valueChanges();
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


    updatePubImage(idpub, urlImage){
      console.log('url image:');
      console.log(urlImage);
      const userDoc = this.firestore.doc<any>('publications/' + idpub);
      return new Promise<any>((resolve, reject) => {
        userDoc.update({
        photo_publication: urlImage
        // Other info you want to add here
      })
        .then(
          res => {
            resolve(res)
          },
          err => reject(err))
      });
    }

  // FIN PARTIE PUBLICATIONS

  // PARTIE CONTACT / USER

    getContactList() { //: AngularFirestoreCollection<Publication> {
      return this.firestore.collection('users').valueChanges()
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

  // FIN PARTIE CONTACT / USER 



  // PARTIE EVENEMENTS
  
    // recuperer les details d'une publication, cette methode permet la manipulation des données depuis le ts
    getEvenementDetail(evntId: string) {
      return this.firestore.collection('evenements').doc(evntId);
    }

    getEvenementComments(pubId: string){
      return this.firestore.collection('comments', ref => ref.where('id_elt', '==', pubId))
    }

    
    modifyEvenement(idevnt, title_evnt, desc_evnt){
      const evntDoc = this.firestore.doc<any>('evenements/' + idevnt);
      const nvDateModif = new Date()
      return new Promise<any>((resolve, reject) => {
        evntDoc.update({
        title_evnt: title_evnt,
        description_evnt: desc_evnt,
        date_modif_evnt : nvDateModif
        // Other info you want to add here
      })
        .then(
          res => {
            resolve(res)
          },
          err => reject(err))
      });

    }

    updateEvntImage(idevnt, urlImage){
      console.log('url image:');
      console.log(urlImage);
      const userDoc = this.firestore.doc<any>('evenements/' + idevnt);
      return new Promise<any>((resolve, reject) => {
        userDoc.update({
        photo_evnt: urlImage
        // Other info you want to add here
      })
        .then(
          res => {
            resolve(res)
          },
          err => reject(err))
      });
    }

    // creation d'une publication, depuis new-publication page
    createEvenement(title_evnt: string, description_evnt: string,imageId, fileRaw, locationName, locationId, dateEvnt): Promise<void> {
      const id_evnt = this.firestore.createId();
      const filePath = '/Image/' + 'Evnt_' + id_evnt + '/' + imageId ;
      const result = this.SaveImageRef(filePath, fileRaw);
      const ref = result.ref;
      const date_evnt = new Date(dateEvnt);
      const date_publication_evnt = new Date();
      const date_modif_evnt = date_publication_evnt;
      const evnt_active = true;

      // console.log(date_publication);
      // console.log(date_modif_publication);
      // console.log(publication_active);
      return result.task.then(a => {
        ref.getDownloadURL().subscribe(a => {
          return this.authsrv.getCurrentUserId().then(res => {
          const id_user = res.uid;

          return this.firestore.doc(`evenements/${id_evnt}`).set({
            id_evnt,
            date_evnt,
            title_evnt,
            date_publication_evnt,
            date_modif_evnt,
            evnt_active,
            description_evnt,
            id_user,
            'photo_evnt':a,
            'lieu_evnt': locationName,
            'id_location_google' : locationId
          });
        })
        .catch(error => {
          console.log(error)
        })
      });
    })
  }


  // FIN PARTIE EVENEMENT

}
