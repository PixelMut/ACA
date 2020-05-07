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
import { AuthenticationService } from './services/authentication.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import {PopoverComponent} from './notif-component/popover/popover.component';
import {IonicStorageModule} from '@ionic/storage';
import {PublicationsPageModule} from './publications/publications.module';
import { FCM } from '@ionic-native/fcm/ngx';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { Camera } from '@ionic-native/camera/ngx';
import { LikesListModalPageModule } from './modals/likes-list-modal/likes-list-modal.module';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [AppComponent, PopoverComponent],
  entryComponents: [PopoverComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireMessagingModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFirestoreModule,
        ReactiveFormsModule,
        FormsModule,
        IonicStorageModule.forRoot(),
        PublicationsPageModule,
        ServiceWorkerModule.register('combined-sw.js', {enabled: environment.production}),
        LikesListModalPageModule,
        PipesModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
      FCM,
    AuthenticationService,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
