import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './services/authentication.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import {PopoverComponent} from "./notif-component/popover/popover.component";
import {IonicStorageModule, Storage} from "@ionic/storage";
import {PublicationsPageModule} from "./publications/publications.module";

// export const firebaseConfig = {
//      apiKey: 'AIzaSyB9jHU1jM_t0CsW33wkbhNbeAUlcxRjCVg',
//      authDomain: 'acensi-community-app.firebaseapp.com',
//      databaseURL: 'https://acensi-community-app.firebaseio.com',
//      projectId: 'acensi-community-app',
//      storageBucket: 'acensi-community-app.appspot.com',
//      messagingSenderId: '534789626138',
//      appId: '1:534789626138:web:2d1faec4a507b42163f4a3',
//      measurementId: 'G-G90RJG21LH'
// };

@NgModule({
  declarations: [AppComponent, PopoverComponent],
  entryComponents: [PopoverComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        ReactiveFormsModule,
        FormsModule,
        IonicStorageModule.forRoot(),
        PublicationsPageModule

    ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
