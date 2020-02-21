import * as functions from 'firebase-functions';  
import * as admin from 'firebase-admin';  

//var admin = require("firebase-admin");

admin.initializeApp();
//const db = admin.firestore();

exports.createProfile = functions.auth
  .user()
  .onCreate((userRecord, context) => {
   
   console.log(userRecord);
   console.log(context);
   return admin.firestore().collection('users').doc(userRecord.uid).set({
          id_user : userRecord.uid,
          nom_user : '',
          prenom_user : '',
          adresse_mail: userRecord.email,
          id_localisation : '',
          id_type_user : 3,
          photo_user : '',
          adresse_user_rue : '',
          adresse_user_code_postal : '',
          adresse_user_localite : '',
          user_actif : true,
          poste : '',
          notif_user_pub : true,
          notif_user_evnt : true
        }).then(writeResult => {
          console.log(writeResult);
        // write is complete here
        });

   
    // return admin
    //     .database()
    //     .ref(`/users/${userRecord.uid}`)
    //     .set({
    //       email: userRecord.email
    //     });


   
  });
  
