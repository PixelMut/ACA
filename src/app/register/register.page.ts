import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email est obligatoire.' },
      { type: 'pattern', message: 'Adresse E-mail Acensi requise' }
    ],
    'password': [
      { type: 'required', message: 'Le mot de passe est obligatoire.' },
      { type: 'minlength', message: 'Le mot de passe doit contenir au moins 6 caracteres.' }
    ]
  };
  constructor(private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public toastController: ToastController) { }

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
      confirmPassword : new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ]))
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  //  displayName: new FormControl('', Validators.compose([
  //       Validators.required
  //     ])),

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {

    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  async tryRegister(value){
    const loading = await this.loadingCtrl.create();
    this.authService.registerUser(value)
     .then(res => {
       //console.log(res);
       this.errorMessage = '';
       this.presentToast();
       loading.dismiss().then(() => {
        this.goLoginPage();
      });

       this.successMessage = '';
      
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = '';
     })

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Votre compte a bien été créé. Vous pouvez dès à présent vous connecter pour le configurer',
      duration: 3000,
      color : "success",
      position : "top"
    });
    toast.present();
  }
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
  }



}
