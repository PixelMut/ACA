import { Component, OnInit } from '@angular/core';
import { FirestoreService  } from '../services/data/firestore.service';
import { Router } from '@angular/router';
import { AngularFirestore} from 'angularfire2/firestore';
import { AuthenticationService } from '../services/authentication.service';
import {NavController, PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../notif-component/popover/popover.component';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-publications',
  templateUrl: 'publications.page.html',
  styleUrls: ['publications.page.scss']
})
export class PublicationsPage implements OnInit {
  public publicationsList;
  private userList;
  private notifList;
  private newItems;

  constructor(
    private afs: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router,
    private authsrv: AuthenticationService,
    private navCtrl: NavController,
    public popoverController: PopoverController,
    private storage: Storage) {

      // old method => Impossible to order by
      // this.publicationsList = this.afs
      // .collection('publications')
      // .valueChanges()
      // .pipe(
      //   innerJoin(afs,'id_user', 'users'),
      //   shareReplay(1)
      // );

      // new method => A bit longer
      this.getListPublication();
      this.getListUsers();
    }

    async getListPublication() {
       this.firestoreService.getPublicationList().subscribe(
        res => {
          this.publicationsList = res;
         });
    }

    async getListUsers(){
      this.firestoreService.getContactList().subscribe(
        res => {
          this.userList = res;
        });
    }

    checkco(){
      this.authsrv.checkToken()
    }

    ngOnInit() {
        this.getNotifs();
    }

    getUserPhoto(iduser){
      return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].photo_user : ''
    }

    getName(iduser){
      return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].nom_user : ''
    }

    getLastName(iduser){
      return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].prenom_user : ''
    }


    doRefresh(event){
      this.getListPublication();
      this.getListUsers();

      setTimeout(() => {
        event.target.complete();
      }, 2000);
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

}
