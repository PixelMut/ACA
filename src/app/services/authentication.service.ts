import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 constructor() {}

  checkInitFirebase() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(environment.firebaseConfig);
    }
  }

    // get ID of user
  async getCurrentUserId(){
    return firebase.auth().currentUser;
  }


  // creation nouvel user
  // - creation dans la partie authentification de Firebase
  // - creation automatique depuis les "functions" firebase, de l'utilisateur dans la table users
  registerUser(value) {
    this.checkInitFirebase();

    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => {
          resolve(res)
        },
        err => reject(err))
    });
  }

  // login de l'utilisateur
  loginUser(value) {
    this.checkInitFirebase();
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => {
          resolve(res),
          // une fois logged, on recupere son token pour les prochaines connexions
          firebase.auth().currentUser.getIdToken(true).then( res2 => {
            //console.log(res2)
          }).catch(error => {
            // Handle error
          });



        },
        err => reject(err))
    })
  }


  logoutUser() {
    this.checkInitFirebase();
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          console.log('LOG Out');
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  userDetails(){
    return firebase.auth().currentUser;
  }
}
