import { Component } from '@angular/core';

import {Platform, MenuController, NavController, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private router: Router,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    public toastController: ToastController
  ) {
    this.initializeApp();
   
  }

/*  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
        (msg) => {
          if (this.platform.is('ios')) {
            this.presentToast(msg.aps.alert);
          } else {
            this.presentToast(msg.body);
          }
        });
  }*/

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.isMenuDisplayed();
      //this.notificationSetup();
    });
  }

  isMenuDisplayed(){
    this.router.events.subscribe((event: RouterEvent) => {
            if ((event instanceof NavigationEnd && ( event.url === '/login' || event.url === '/register' )) || (!event.url) ) {
              this.menuCtrl.enable(false);
             // console.log('disable menu')
            } else {
              this.menuCtrl.enable(true);
            //  console.log('enable menu')
            }
          })
  }

  goToContacts(){
    this.navCtrl.navigateForward('/tabs/contacts')
  }

  goToNewsLetter(){
    this.navCtrl.navigateForward('/tabs/newsletter')
  }

  goToProfile(){
    this.authService.getCurrentUserId().then(res => {
      //this.router.navigate([page.url + '/' + res.uid]);
      this.navCtrl.navigateForward('/tabs/contacts/modif/'+res.uid)
    })
        .catch(error => {
          console.log(error)
        })
  }

  logout() {
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

}
