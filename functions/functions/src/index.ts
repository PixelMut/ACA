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
        // pour tous les utilisateurs
       list_users.docs.map(async (objectDoc) => {
           //list_users_id.push(objectDoc.data().id_user)
           // si id user est different de id creator
           if(objectDoc.data().id_user !== snapshot.data().id_user){
               const id_notification = [...Array(20)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
                // on créé la notification
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
                   //console.log('written');
                   // et on envoi la notif push
                  // niktamere(objectDoc.data().id_user);
                   //console.log('end niktamere');
                   // write is complete here
               }).catch( err => {
                   console.log('error');
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
                    type_elt : change.before.data().evnt_active !== change.after.data().evnt_active && change.after.data().evnt_active === false ? 'evnt_abort' : (change.before.data().evnt_active !== change.after.data().evnt_active && change.after.data().evnt_active === true ? 'evnt_activate' : 'evnt_change')
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




// lors de l'ajout d'un element dans la table notifs
exports.sendFollowerPushNotification = functions.firestore
    .document('/notifications/{notifId}')
    .onWrite(async (change:any, context) => {
        console.log('--------------------------- on write send follwoer Notificaion');
        console.log(change.after.data());
        // recup du token du device de l'utilisateur pour lequel la notif à été crée
        const devicesRef = await admin.firestore().collection('devices').where('userId', '==', change.after.data().id_user).get();
        devicesRef.docs.map(async (objectDoc) => { // liste des devices (normalement que 1) // userid et token
            //console.log('send notif to device :'+objectDoc.data().token )
            // Notification details.
            const payload = {
                notification: {
                    title: '',
                    body: ''
                }
            };
            switch(change.after.data().type_elt){
            case 'publication':
                payload.notification.title = 'Nouvelle Publication';
                payload.notification.body = 'Quelqu\'un a publié une actualité..';
                break;
            case 'evenement':
                payload.notification.title = 'Nouvel Evenement';
                payload.notification.body = 'Quelqu\'un a lancé un évenement..';
                break;
            case 'evnt_change':
                payload.notification.title = 'Update Evenement';
                payload.notification.body = 'Quelqu\'un a modifié un évenement..';
                break;
            case 'evnt_abort':
                payload.notification.title = 'Update Evenement';
                payload.notification.body = 'Quelqu\'un a annulé un évenement..';
                break;
            case 'evnt_activate':
                payload.notification.title = 'Update Evenement';
                payload.notification.body = 'Quelqu\'un a ré-activé un évenement..';
                break;
            case 'com_pub':
                payload.notification.title = 'Nouveau Commentaire';
                payload.notification.body = 'Quelqu\'un a commenté une actualité..';
                break;
            case 'com_evnt':
                payload.notification.title = 'Nouveau Commentaire';
                payload.notification.body = 'Quelqu\'un a commenté un événement..';
                break;
            default:
                //default code to be executed
                //if none of the above case executed
            }



            let tokens;
            // Listing all tokens as an array.
            tokens = objectDoc.data().token;
            // Send notifications to all tokens.
            const response = await admin.messaging().sendToDevice(tokens, payload);
            // For each message check if there was an error.
            //const tokensToRemove : string[] = [];
            response.results.forEach((result, index) => {
                console.log(result)
            });



        });

        console.log('---------------------------on write end follwoer Notificaion')

        /*const followerUid = context.params.followerUid;
const followedUid = context.params.followedUid;
// If un-follow we exit the function.
if (!change.after.val()) {
    console.log('User ', followerUid, 'un-followed user', followedUid);
    return;
}
console.log('We have a new follower UID:', followerUid, 'for user:', followedUid);

// Get the list of device notification tokens.
const getDeviceTokensPromise = admin.database()
    .ref(`/users/${followedUid}/notificationTokens`).once('value');

// Get the follower profile.
const getFollowerProfilePromise = admin.auth().getUser(followerUid);

// The snapshot to the user's tokens.
let tokensSnapshot;

// The array containing all the user's tokens.
let tokens;

const results = await Promise.all([getDeviceTokensPromise, getFollowerProfilePromise]);
tokensSnapshot = results[0];
const follower = results[1];

// Check if there are any device tokens.
if (!tokensSnapshot.hasChildren()) {
    console.log('There are no notification tokens to send to.');
    return;
}
console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
console.log('Fetched follower profile', follower);

// Notification details.
const payload = {
    notification: {
        title: 'You have a new follower!',
        body: `${follower.displayName} is now following you.`,
        icon: follower.photoURL
    }
};

// Listing all tokens as an array.
tokens = Object.keys(tokensSnapshot.val());
// Send notifications to all tokens.
const response = await admin.messaging().sendToDevice(tokens, payload);
// For each message check if there was an error.
const tokensToRemove : string[] = [];
response.results.forEach((result, index) => {
    const error = result.error;
    if (error) {
        console.error('Failure sending notification to', tokens[index], error);
        // Cleanup the tokens who are not registered anymore.
        if (error.code === 'messaging/invalid-registration-token' ||
            error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
        }
    }
});
return Promise.all(tokensToRemove);*/


    });
