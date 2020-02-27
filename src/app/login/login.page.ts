import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';

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
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@acensi+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });

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
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }


  

 

}
