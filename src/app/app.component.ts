import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, NavController } from '@ionic/angular';
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
  pages = [
   
    {
      title: 'Contact',
      url: '/tabs/tab3',
      icon: 'person'
    },
    {
      title: 'About',
      url: '/tabs/about',
      icon: 'information-circle'
    }
  ];

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
    this.router.events.subscribe((event:RouterEvent) => {
            if (  (event instanceof NavigationEnd && ( event.url === '/login' || event.url === '/register' )) || (!event.url) ) {
              this.menuCtrl.enable(false);
             // console.log('disable menu')
            } else {
              this.menuCtrl.enable(true);
            //  console.log('enable menu')
            }
          })
  }


  goToPage(page) {
    this.router.navigate([page.url]);
  }

  logout(){
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
