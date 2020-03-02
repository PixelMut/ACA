import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import {Storage} from '@ionic/storage';

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

  

  constructor(public afDB: AngularFireDatabase,
              private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private storage: Storage) {

              this.validations_form = this.formBuilder.group({
                email : new FormControl('',Validators.compose([
                  Validators.required,
                  Validators.pattern('^[a-zA-Z0-9_.+-]+@acensi+.[a-zA-Z0-9-.]+$')
                ])),
                password: new FormControl('', Validators.compose([
                  Validators.minLength(5),
                  Validators.required
                ])),
              });

              }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.storage.set('uid', user.uid);
        this.navCtrl.navigateRoot('/tabs/publications', {replaceUrl: true});
      }
    })
  }


  // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.navCtrl.navigateRoot('/tabs/publications', {replaceUrl: true});
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
