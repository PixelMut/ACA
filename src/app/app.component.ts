import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { FirestoreService } from './services/data/firestore.service';

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
    private navCtrl: NavController
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.isMenuDisplayed();
    });
  }

  isMenuDisplayed(){
    this.router.events.subscribe((event: RouterEvent) => {
            if (  (event instanceof NavigationEnd && ( event.url === '/login' || event.url === '/register' )) || (!event.url) ) {
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
