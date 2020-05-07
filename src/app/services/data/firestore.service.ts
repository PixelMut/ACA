import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreDocument } from 'angularfire2/firestore';

// test join
import { combineLatest , pipe, of,  defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Contact } from 'src/app/models/contact.interface';
import { AuthenticationService } from '../authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

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

          // save the parent data state
          collectionData = data as any[];
          // console.log(collectionData) // liste des documents
          const reads$ = [];
          for (const doc of collectionData) {
            // push doc read to array
            // console.log(doc) // liste des documents
            if (doc[field]) {
              // perform query on join key, with optionnal limit
              const q = ref => ref.where(field, '==' , doc[field]).limit(limit);

              // reads$.push(afs.collection(collection, q).valueChanges());
              reads$.push(afs.collection(collection, q).valueChanges());
            } else {
              reads$.push(of([]));
            }
          }
          return combineLatest(reads$);
        }),
        map(joins => {
          return collectionData.map((v, i) => {
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
  // savedContacts;
  constructor(public firestore: AngularFirestore,
              private authsrv: AuthenticationService,
              private storage: AngularFireStorage) { }

    // partie droits user
    getCurrentUserType(iduser) {
      return this.firestore.collection('users', ref => ref
          .where('id_user', '==', iduser )).valueChanges();
    }

    saveToken(token, currentuser) {
      const devicesRef = this.firestore.collection('devices');
      //alert('currentuser : ' + currentuser);
      const docData = {
        token,
        userId: currentuser,
      };
      return devicesRef.doc(token).set(docData);
    }

    // PARTIE NOTIFICATIONS

    isAnyNotif(idusertonotify) {
      return this.firestore.collection('notifications', ref => ref
          .where('id_user', '==', idusertonotify )
          // .where('is_new', '==', true) // limitation du nombre de notif à 30
          .orderBy('date_publi', 'desc').limit(30)).valueChanges();
    }

    isAnyEvent() {
      return this.firestore.collection('evenements', ref => ref
          .where('date_evnt', '>=', new Date())).valueChanges();
    }

    // lors du clic sur "notifications", on les passe en is_new = false
    changeStateToSeen(listeDesNotif) {
      listeDesNotif.forEach(elt => {
        const notifDoc = this.firestore.doc<any>('notifications/' + elt.id_notif);
        return new Promise<any>((resolve, reject) => {
          notifDoc.update({
            is_new : false
          });
        });
      });


    }



  setSeen(eltId, userId) {
    const notifDoc = this.firestore.collection('notifications', ref => ref
        .where('id_elt', '==', eltId)
        .where('id_user', '==', userId));
    notifDoc.get().subscribe(items => {
      items.forEach(doc => {
        doc.ref.update({
          is_seen : true
        });
      });
    });
  }


  // PARTIE PUBLICATIONS

    // creation d'une publication, depuis new-publication page
    createPublication(title_publication: string, description_publication: string, imageId, fileRaw, isNewsletter = false): Promise<void> {
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
              photo_publication: a,
              nblike : 0,
              nbcom : 0,
              is_newsletter : isNewsletter
            });

          })
          .catch(error => {
            console.log(error);
          });
        });
      });
    }

    deletePub(id_publication: string): Promise<void> {
      console.log('entre deletePub');
      return new Promise<any>((resolve, reject) => {
        this.getPublicationComments(id_publication).subscribe(
            res => {
              if (res.length > 0) { // présence de commentaires
                this.deleteCommentaires(id_publication);
                this.firestore.doc(`publications/${id_publication}`).delete();
                resolve(res);
              } else {
                this.firestore.doc(`publications/${id_publication}`).delete();
                resolve(res);
              }
            }
        );
      });

/*      this.getPublicationComments(id_publication).subscribe(
          res => {
            if(res.length > 0){ // présence de commentaires
              this.deleteCommentairesPublication(id_publication);
              return this.firestore.doc(`publications/${id_publication}`).delete();
            }else{
              return this.firestore.doc(`publications/${id_publication}`).delete();
            }
          }
      );*/
    }



    checkLikeStatus(idPub, idUser){
      return this.firestore.collection('likes', ref => ref
          .where('id_publication', '==', idPub).where('id_user', '==', idUser)).get();
    }

    deleteLike(idPub, idUser, newcount){
      const delete_likes = this.firestore.collection('likes', ref => ref.where('id_publication', '==', idPub).where('id_user', '==', idUser));
      delete_likes.get().subscribe(delItems => {
        delItems.forEach(doc => {
          doc.ref.delete();
        });
      });

      const pubDoc = this.firestore.doc<any>('publications/' + idPub);
      return new Promise<any>((resolve, reject) => {
        pubDoc.update({
        nblike : newcount
      })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err));
      });

    }

    addLike(idPub, idUser, newcount){
      const id_like = this.firestore.createId();
        this.firestore.doc(`likes/${id_like}`).set({
          id_publication : idPub,
          id_user : idUser
        })


      const pubDoc = this.firestore.doc<any>('publications/' + idPub);
      return new Promise<any>((resolve, reject) => {
        pubDoc.update({
        nblike : newcount
      })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err));
      });
    }

    // fonction utilisée pour les commentaires des publications et des evenements
    deleteCommentaires(id_elt) {
    console.log('entre deleteCommentaires');
    const delete_comms = this.firestore.collection('comments', ref => ref.where('id_elt', '==', id_elt));
    delete_comms.get().subscribe(delItems => {
        delItems.forEach(doc => {
          doc.ref.delete();
        });
      });
    }

    SaveImageRef(filePath, file) {
    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
  }

    modifyPublication(idpub, title_pub, desc_pub) {
      const pubDoc = this.firestore.doc<any>('publications/' + idpub);
      const nvDateModif = new Date();
      return new Promise<any>((resolve, reject) => {
        pubDoc.update({
        title_publication: title_pub,
        description_publication: desc_pub,
        date_modif_publication : nvDateModif
        // Other info you want to add here
      })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err));
      });

    }

    // recuperer la liste des publications, depuis publications page
    getPublicationList() { // : AngularFirestoreCollection<Publication> {
     // return this.firestore.collection('publications');

     // arrive a trier par date avec :
      return this.firestore.collection('publications', ref => ref.orderBy('date_publication', 'desc')).valueChanges();
    }

    // recuperer la liste des publications type newsletter, depuis page newsletter
    getNewsletterList(){
      return this.firestore.collection('publications', ref => ref.orderBy('date_publication', 'desc').where('is_newsletter', '==', true)).valueChanges();

    }

    getLikesList(idpub){
      return this.firestore.collection('likes', ref => ref.where('id_publication', '==', idpub)).valueChanges();
    }

    // // recuperer les details d'une publication
    // getPublicationDetail(pubId: string): AngularFirestoreDocument<Publication> {
    //   return this.firestore.collection('publications').doc(pubId);
    // }

      // recuperer les details d'une publication, cette methode permet la manipulation des données depuis le ts
    getPublicationDetail(pubId: string) {
      return this.firestore.collection('publications').doc(pubId);
    }

    getPublicationComments(pubId: string) {
      return this.firestore.collection('comments', ref => ref.where('id_elt', '==', pubId).orderBy('date_comment', 'asc')).valueChanges();
    }


    updatePubImage(idpub, urlImage) {
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
            resolve(res);
          },
          err => reject(err));
      });
    }

    add_intoNewsletter(idpub){
      const pubDoc = this.firestore.doc<any>('publications/' + idpub);
      return new Promise<any>((resolve, reject) => {
        pubDoc.update({
        is_newsletter: true
        // Other info you want to add here
      })
        .then(
          res => {
            resolve('ok');
          },
          err => reject(err));
      });
    }

    remove_fromNewsletter(idpub){
      const pubDoc = this.firestore.doc<any>('publications/' + idpub);
      return new Promise<any>((resolve, reject) => {
        pubDoc.update({
          is_newsletter: false
        // Other info you want to add here
      })
        .then(
          res => {
            resolve('ok');
          },
          err => reject(err));
      });
    }


    addComment(comment_content, id_elt: string, id_user: string, type_elt: string) {
    const id_comment = this.firestore.createId();
      // const filePath = '/Image/' + 'Post_' + id_publication + '/' + imageId ;
      // const result = this.SaveImageRef(filePath, fileRaw);
      // const ref = result.ref;
    const date_comment = new Date();
      // const date_modif_publication = date_publication;
    const comment_active = true;

    return new Promise<any>((resolve, reject) => {
        this.firestore.doc(`comments/${id_comment}`).set({
          id_comment,
          comment_content,
          id_elt,
          id_user,
          comment_active,
          date_comment,
          type_elt
        })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err));
      });


      // return this.firestore.doc(`comments/${id_comment}`).set({
      //   id_comment,
      //   comment_content : content,
      //   id_elt = elementId,
      //   id_user = userId,
      //   publication_active,
      //   description_publication,
      //   id_user,
      //   'photo_publication':a
      // });




    }

  deleteComment(id_comment){
    return this.firestore.doc(`comments/${id_comment}`).delete();
  }

  updateCommentCounter(idPub,newcount){
    const pubDoc = this.firestore.doc<any>('publications/' + idPub);
    return new Promise<any>((resolve, reject) => {
      pubDoc.update({
      nbcom : newcount
    })
      .then(
        res => {
          resolve(res);
        },
        err => reject(err));
    });
  }
  // FIN PARTIE PUBLICATIONS - ------------------------------------------------------------------

  // PARTIE CONTACT / USER ----------------------------------------------------------------------

    getContactList() { // : AngularFirestoreCollection<Publication> {
      return this.firestore.collection('users').valueChanges();
    }

    // setContacts(contacts){
    //   this.savedContacts = contacts;
    //   console.log(this.savedContacts)
    // }

    getContactDetail(contactId: string): AngularFirestoreDocument<Contact> {
      return this.firestore.collection('users').doc(contactId);
    }

    modifyProfil(iduser, value) {
      const userDoc = this.firestore.doc<any>('users/' + iduser);
      return new Promise<any>((resolve, reject) => {
        userDoc.update({
        nom_user: value.nom_user,
        prenom_user: value.prenom_user,
        adresse_user_code_postal : value.adresse_user_code_postal,
        adresse_user_localite : value.adresse_user_localite,
        adresse_user_rue : value.adresse_user_rue,
        poste : value.poste,
        sexe: value.sexe
        // Other info you want to add here
      })
        .then(
          res => {
            resolve(res);
          },
          err => reject(err));
      });

    }

    updateUserImage(iduser, urlImage) {
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
            resolve(res);
          },
          err => reject(err));
      });
    }

    getUserPublicationList(iduser) {
      return this.firestore.collection('publications', ref => ref.orderBy('date_publication', 'desc').where('id_user', '==' , iduser)).valueChanges();
    }

  // FIN PARTIE CONTACT / USER -----------------------------------------------------------------------



  // PARTIE EVENEMENTS -------------------------------------------------------------------------

    // recuperer les details d'une publication, cette methode permet la manipulation des données depuis le ts
    getEvenementDetail(evntId: string) {
      return this.firestore.collection('evenements').doc(evntId);
    }

    getEvenementComments(evntId: string) {
      console.log('entre getEvenementsComments');
      return this.firestore.collection('comments', ref => ref.where('id_elt', '==', evntId).orderBy('date_comment', 'asc')).valueChanges();
    }

    getEvntList() { // : AngularFirestoreCollection<Publication> {
    // return this.firestore.collection('publications');
    // arrive a trier par date avec :
      return this.firestore.collection('evenements', ref => ref.orderBy('date_evnt', 'asc').where('date_evnt', '>=', new Date())).valueChanges();
    }

    getPassedEvntList() {
      return this.firestore.collection('evenements', ref => ref.orderBy('date_evnt', 'desc').where('date_evnt', '<', new Date())).valueChanges();
    }

    modifyEvenement(idevnt, title_evnt, desc_evnt, locationName, locationId, dateEvnt, currentUserType, isOfficial = false ) {
      const evntDoc = this.firestore.doc<any>('evenements/' + idevnt);
      const nvDateModif = new Date();

      if (locationName !== '' && locationId !== '') {
        return new Promise<any>((resolve, reject) => {

          evntDoc.update({
            title_evnt,
            description_evnt: desc_evnt,
            date_modif_evnt : nvDateModif,
            date_evnt : new Date(dateEvnt) ,
            lieu_evnt: locationName,
            id_location_google : locationId,
            is_admin_level : isOfficial
            // Other info you want to add here
          })
              .then(
                  res => {
                    resolve(res);
                  },
                  err => reject(err));
        });
        // is_admin_level : (currentUserType === 1 || currentUserType === 2)

      } else {
        return new Promise<any>((resolve, reject) => {

          evntDoc.update({
            title_evnt,
            description_evnt: desc_evnt,
            date_modif_evnt : nvDateModif,
            date_evnt : new Date(dateEvnt) ,
            is_admin_level : isOfficial
            // Other info you want to add here
          }).then(
               res => {
                  resolve(res);
               },
                  err => reject(err));
        });
      }


    }

    deleteEvnt(id_evnt: string): Promise<void> {
      console.log('entre deleteEvnt');
      return new Promise<any>((resolve, reject) => {
        this.getEvenementComments(id_evnt).subscribe(
            res => {
              console.log(res);
              if (res.length > 0) { // présence de commentaires
                this.deleteCommentaires(id_evnt);
                this.firestore.doc(`evenements/${id_evnt}`).delete();
                resolve(res);
              } else {
                this.firestore.doc(`evenements/${id_evnt}`).delete();
                resolve(res);
              }
            });
      });
    }

   cancelEvent(id_evnt: string): Promise<void> {
     console.log('entre cancelEvnt');
     const evntDoc = this.firestore.doc<any>('evenements/' + id_evnt);
     return new Promise<any>((resolve, reject) => {

       evntDoc.update({
         evnt_active : false
         // Other info you want to add here
       }).then(
           res => {
             resolve(res);
           },
           err => reject(err));
     });
   }

    activateEvnt(id_event: string): Promise<void> {
      console.log('entre activEvnt');
      const evntDoc = this.firestore.doc<any>('evenements/' + id_event);
      return new Promise<any>((resolve, reject) => {

        evntDoc.update({
          evnt_active : true
          // Other info you want to add here
        }).then(
            res => {
              resolve(res);
            },
            err => reject(err));
      });
    }


    updateEvntImage(idevnt, urlImage) {
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
            resolve(res);
          },
          err => reject(err));
      });
    }

    // creation d'une publication, depuis new-publication page
    createEvenement(title_evnt: string, description_evnt: string, imageId, fileRaw, locationName, locationId, dateEvnt, currentUserType,isOfficial=false,withDefaultImage = false): Promise<void> {
      const id_evnt = this.firestore.createId();
      const date_evnt = new Date(dateEvnt);
      const date_publication_evnt = new Date();
      const date_modif_evnt = date_publication_evnt;
      const evnt_active = true;

      // image par default ou non
      if(withDefaultImage === true){

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
              photo_evnt: imageId,
              lieu_evnt: locationName,
              id_location_google : locationId,
              is_admin_level : isOfficial //(currentUserType === 1 || currentUserType === 2)
            });
            // is_admin_level : (currentUserType === 1 || currentUserType === 2)
          })
          .catch(error => {
            console.log(error);
          });
      }else{
        const filePath = '/Image/' + 'Evnt_' + id_evnt + '/' + imageId ;
        const result = this.SaveImageRef(filePath, fileRaw);
        const ref = result.ref;

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
              photo_evnt: a,
              lieu_evnt: locationName,
              id_location_google : locationId,
              is_admin_level : isOfficial //(currentUserType === 1 || currentUserType === 2)
            });
            // is_admin_level : (currentUserType === 1 || currentUserType === 2)
          })
          .catch(error => {
            console.log(error);
          });
        });
      });

      }
      
      
      


      // console.log(date_publication);
      // console.log(date_modif_publication);
      // console.log(publication_active);

  }


  // FIN PARTIE EVENEMENT

}
