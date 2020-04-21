import { Component, OnInit } from '@angular/core';
import { FirestoreService, innerJoin  } from '../services/data/firestore.service';
import { Router } from '@angular/router';
import { AngularFirestore} from 'angularfire2/firestore';
import { shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../notif-component/popover/popover.component';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.page.html',
  styleUrls: ['./evenements.page.scss'],
})
export class EvenementsPage implements OnInit {
  public evntList;
  public outdated_evntList;
  private userList;
  private notifList;
  public newItems;

  constructor(
    private afs: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router,
    private authsrv: AuthenticationService,
    public popoverController: PopoverController,
    private storage: Storage) {

      this.getListEvent();
      this.getListUsers();
   }

  ngOnInit() {
    this.getNotifs();
  }

  getNotifs(){
    console.log('get notifs')
      this.storage.get('uid').then((val) => {
          console.log('get notif for '+ val)
          this.firestoreService.isAnyNotif(val).subscribe(
              res => {
                  this.notifList = res;
                  this.newItems =  this.notifList.filter(x => x.is_new === true);
              })
      });

  }

  async getListUsers(){
    this.firestoreService.getContactList().subscribe(
      res => {
        this.userList = res;
      });
  }

  async seeNotif(ev:any){
    const popover = await this.popoverController.create({
        component: PopoverComponent,
        event: ev,
        translucent: false,
        componentProps : { data : this.notifList, userList : this.userList },
        cssClass : 'pop-over-style'
    });
    return await popover.present();
}

  async getListEvent() {
    this.firestoreService.getEvntList().subscribe(
      res => {
       this.evntList = res;
      });

    this.firestoreService. getPassedEvntList().subscribe(
      res => {
       this.outdated_evntList = res;
      });
  }

  getRemainingTime(dateEvent) {
    const maintenant = new Date();
    const seconds = dateEvent.seconds * 1000 - maintenant.getTime();
    return this.secondsToDhms(seconds / 1000);
  }

  secondsToDhms(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    //const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d === 1 ? ' jour, ' : ' jours, ') : '';
    const hDisplay = h > 0 ? h + (h === 1 ? ' heure, ' : ' heures, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes ') : '';
    // let sDisplay = s > 0 ? s + (s === 1 ? ' seconde' : ' secondes') : '';
    return dDisplay + hDisplay + mDisplay; // + sDisplay;
  }

  doRefresh(event){
    this.getListEvent();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }


}
