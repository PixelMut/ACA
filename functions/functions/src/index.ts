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
          nom_user : 'Nouvel',
          prenom_user : 'Utilisateur',
          adresse_mail: userRecord.email,
          id_localisation : '',
          id_type_user : 3,
          photo_user : 'https://firebasestorage.googleapis.com/v0/b/acensi-community-app.appspot.com/o/Image%2FProfil%2F8cDzuC2JfFvBhg8hdzq8?alt=media&token=0a0b112f-97b8-45c2-8bf9-9bb89a1f9790',
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
        //console.log('-----------------------users--------------------------');
        const list_users = await admin.firestore().collection('users').get();

       list_users.docs.map(async (objectDoc) => {
           //list_users_id.push(objectDoc.data().id_user)
           if(objectDoc.data().id_user !== snapshot.data().id_user){
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
        //console.log('----------------------- end users--------------------------');

    });

exports.createNotifFromEvnt = functions.firestore
    .document('evenements/{id_evnt}')
    .onCreate(async (snapshot:any) => {
        const datedujour = new Date();
        //let list_users_id;// = [];
        //console.log('-----------------------users--------------------------');
        const list_users = await admin.firestore().collection('users').get();

        list_users.docs.map(async (objectDoc) => {
            //list_users_id.push(objectDoc.data().id_user)
            if(objectDoc.data().id_user !== snapshot.data().id_user){
                const id_notification = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

                return admin.firestore().collection('notifications').doc(id_notification).set({
                    date_publi : datedujour,
                    id_creator : snapshot.data().id_user,
                    id_elt : snapshot.data().id_evnt,
                    id_notif: id_notification,
                    id_user : objectDoc.data().id_user,
                    is_new : true,
                    is_seen : false,
                    type_elt : 'evenement'
                }).then(writeResult => {
                    console.log('written');
                    // write is complete here
                }).catch( err => {
                    console.log('error')
                });
            }

        });
        //console.log('----------------------- end users--------------------------');

    });

exports.createNotifFromEvntChange = functions.firestore
    .document('evenements/{id_evnt}')
    .onUpdate(async (change:any) => {
        const datedujour = new Date();
        console.log('-----------------------users--------------------------');
        const list_users = await admin.firestore().collection('users').get();

        list_users.docs.map(async (objectDoc) => {
            //list_users_id.push(objectDoc.data().id_user)
            console.log('-----------------------change before--------------------------');
            console.log(change.before.data());
            console.log('-----------------------change after--------------------------');
            console.log(change.after.data());
            if(objectDoc.data().id_user !== change.after.data().id_user){
                const id_notification = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

                return admin.firestore().collection('notifications').doc(id_notification).set({
                    date_publi : datedujour,
                    id_creator : change.after.data().id_user,
                    id_elt : change.after.data().id_evnt,
                    id_notif: id_notification,
                    id_user : objectDoc.data().id_user,
                    is_new : true,
                    is_seen : false,
                    type_elt : 'evnt_change'
                }).then(writeResult => {
                    console.log('written');
                    // write is complete here
                }).catch( err => {
                    console.log('error')
                });
            }

        });
        console.log('----------------------- end users--------------------------');

    });

exports.createNotifFromComment = functions.firestore
    .document('comments/{id_comment}')
    .onCreate(async (snapshot:any) => {
        const datedujour = new Date();
        //let list_users_id;// = [];
        //console.log('-----------------------users--------------------------');
        const list_users = await admin.firestore().collection('users').get();

        list_users.docs.map(async (objectDoc) => {
            //list_users_id.push(objectDoc.data().id_user)
            if(objectDoc.data().id_user !== snapshot.data().id_user){
                const id_notification = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

                return admin.firestore().collection('notifications').doc(id_notification).set({
                    date_publi : datedujour,
                    id_creator : snapshot.data().id_user,
                    id_elt : snapshot.data().id_elt,
                    id_notif: id_notification,
                    id_user : objectDoc.data().id_user,
                    is_new : true,
                    is_seen : false,
                    type_elt : snapshot.data().type_elt
                }).then(writeResult => {
                    console.log('written');
                    // write is complete here
                }).catch( err => {
                    console.log('error')
                });
            }

        });
        //console.log('----------------------- end users--------------------------');

    });
