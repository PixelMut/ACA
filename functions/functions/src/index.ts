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

   
  });

exports.createNotifFromPublication = functions.firestore
    .document('publications/{id_publication}')
    .onCreate(async (snapshot:any) => {
        const datedujour = new Date();
        //let list_users_id;// = [];
        console.log('-----------------------users--------------------------');
        const list_users = await admin.firestore().collection('users').get();

       list_users.docs.map(async (objectDoc) => {
           //list_users_id.push(objectDoc.data().id_user)
           if(objectDoc.data().id_user !== snapshot.data().id_publication){
               const id_notification = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

               return admin.firestore().collection('notifications').doc(id_notification).set({
                   date_publi : datedujour,
                   id_creator : snapshot.data().id_user,
                   id_elt : snapshot.data().id_publication,
                   id_notif: id_notification,
                   id_user : objectDoc.data().id_user,
                   is_new : true,
                   is_seen : false,
                   type_elt : 'publication'
               }).then(writeResult => {
                   console.log('written');
                   // write is complete here
               }).catch( err => {
                   console.log('error')
               });
           }

        });
        console.log('----------------------- end users--------------------------');

// Wait for all promises created before returning
       // await Promise.all(promises);
/*        console.log('is waiting ?');
        list_users_id.forEach(
            user => {
                console.log('ajout pour user '+user);
                const id_notification = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

                return admin.firestore().collection('notifications').doc(id_notification).set({
                    date_publi : datedujour,
                    id_creator : snapshot.data().id_user,
                    id_elt : snapshot.data().id_publication,
                    id_notif: id_notification,
                    id_user : user,
                    is_new : true,
                    is_seen : false,
                    type_elt : 'publication'
                }).then(writeResult => {
                    console.log('written');
                    // write is complete here
                }).catch( err => {
                    console.log('error')
                });
            }
        );*/


        /*return admin.firestore().collection('notifications').doc(id_notification).set({
            date_publi : datedujour,
            id_creator : snapshot.data().id_user,
            id_elt : snapshot.data().id_publication,
            id_notif: id_notification,
            id_user : 'VqLO9YKtm9TT5i33tvbaHwAf4cF3',
            is_new : true,
            is_seen : false,
            type_elt : 'publication'
        }).then(writeResult => {
            console.log(writeResult);
            // write is complete here
        });*/
    });



