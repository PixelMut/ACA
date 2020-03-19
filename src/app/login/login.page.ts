import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import {Storage} from '@ionic/storage';
import {FirestoreService} from '../services/data/firestore.service';
import {FCM} from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  showForgottenPswd = false; // afficher / cacher la partie mdp oublié
  validation_messages = {
    'email': [
      { type: 'required', message: 'Adresse mail obligatoire.' },
      { type: 'pattern', message: 'Veuillez saisir un email valide.' }
    ],
    'password': [
      { type: 'required', message: 'Mot de passe obligatoire.' },
      { type: 'minlength', message: 'Le mot de passe doit au moins contenir 5 caracteres.' }
    ]
  };

  

  constructor(private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private firestoreSrv: FirestoreService,
              private fcm: FCM) {

              this.validations_form = this.formBuilder.group({
                email : new FormControl('',Validators.compose([
                  Validators.required,
                  Validators.pattern('^[a-zA-Z0-9_.+-]+@acensi+.[a-zA-Z0-9-.]+$')
                ])),
                password: new FormControl('', Validators.compose([
                  Validators.minLength(6),
                  Validators.required
                ])),
              });

              }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          this.storage.set('uid', user.uid); // save du id user dans le storage
          this.fcm.getToken().then(token => {
              console.log('ezfjmeofesjf');
              this.firestoreSrv.saveToken(token, user.uid);
          }).catch(error => {
              console.log(error);
          });
          this.firestoreSrv.getCurrentUserType(user.uid).subscribe(
            (res: any) => {
              this.storage.set('tu', res[0] ? res[0].id_type_user : 3); // save du type user dans le storage
              this.navCtrl.navigateRoot('/tabs/publications', {replaceUrl: true});}
        );
      }
    });
  }


  // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
        this.storage.set('uid', res.user.uid); // save du id user dans le storage
        this.fcm.getToken().then(token => {
            console.log('ezfjmeofesjf');
            this.firestoreSrv.saveToken(token, res.user.uid);
        }).catch(error => {
            console.log(error);
        });
        this.firestoreSrv.getCurrentUserType( res.user.uid).subscribe(
          ( res : any) => {
            this.errorMessage = '';
            this.storage.set('tu', res[0].id_type_user); // save du type user dans le storage
            this.navCtrl.navigateRoot('/tabs/publications', {replaceUrl: true});
          }
        );
    }, err => {
      this.errorMessage = err.message;
    })
  }

  recover_mail(){
    this.showForgottenPswd = true;
    
  }

  sendMail(elt){
    if(elt !== ''){
       this.authService.recoverMail(elt)
        .then(res => {
          console.log(res);
          this.showForgottenPswd = false;

        }, err => {
          console.log(err);
        })
    }
  }

  cancelPwdMail(){
      this.showForgottenPswd = false;
  }

  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

  // password reset
//   this.firebaseAuthentication.sendPasswordResetEmail()
// .then((res: any) => console.log(res))
// .catch((error: any) => console.error(error));


  

 

}
