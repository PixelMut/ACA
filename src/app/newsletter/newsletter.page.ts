import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { FirestoreService } from '../services/data/firestore.service';
import { AuthenticationService } from '../services/authentication.service';
import { LikesListModalPage } from '../modals/likes-list-modal/likes-list-modal.page';
import { PopoverComponent } from '../notif-component/popover/popover.component';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-newsletter',
  templateUrl: '../publications/publications.page.html',
  styleUrls: ['./newsletter.page.scss','../publications/publications.page.scss'],
})
// templateUrl: './newsletter.page.html',
export class NewsletterPage implements OnInit {
  public publicationsList;
  public likelist;
  private userList;
  private notifList;
  public newItems;
  public showLikes = false;
  public currentUserType;
  constructor(
    private firestoreService: FirestoreService,
    private authsrv: AuthenticationService,
    private navCtrl: NavController,
    public popoverController: PopoverController,
    private storage: Storage,
    private afMessaging: AngularFireMessaging,
    public modalController: ModalController,
    public toastController: ToastController) { 
      this.verifyUser();
      this.getListPublication();
      this.getListUsers();
      //this.requestPushNotificationsPermission(); 
    }

  ngOnInit() {
    this.getNotifs();
    this.storage.get('tu').then((val) => {
      this.currentUserType = val
    });
  }

  async presentModal(idPubl) {
      
    const modal = await this.modalController.create({
      component: LikesListModalPage,
      componentProps: {
        "publication_id": idPubl,
        "userList" : this.userList
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        // console.log(dataReturned.data)
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();

  }

  async showOrNotLikes(idPubl){
    this.showLikes = !this.showLikes;
    console.log(this.userList)
    this.firestoreService.getLikesList(idPubl).subscribe(
      res => {
        console.log(res)
        this.likelist = res;
        // this.publicationsList.forEach(element => {
        //   console.log(element)
        // });
       });
  }

  add_remove_newsletter(idpub,isalreadynews){
  
    if(isalreadynews === false){
      this.firestoreService.add_intoNewsletter(idpub).then(
        res=>{
          if(res === 'ok'){
            this.presentToast('Ajouté à la Newsletter','success')
          }
        }
      )
    }else{
      this.firestoreService.remove_fromNewsletter(idpub).then(
        res => {
          if(res === 'ok'){
            this.presentToast('Retiré de la Newsletter','warning')
          }
        }
      )
    }
  }

  async presentToast(msg,color) {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      duration: 2000
    });
    toast.present();
  }

  async verifyUser(){
    this.storage.get('needSetup').then(
        res => {
            if(res === true){
                this.storage.get('uid').then(res2 => {
                    this.navCtrl.navigateForward('/tabs/contacts/modif/' + res2);
                });
            }
        });
      /*firebase.auth().onAuthStateChanged(user => {
          if (user) {
              this.storage.set('uid', user.uid); // save du id user dans le storage
              this.fcm.getToken().then(token => {
                  console.log('ezfjmeofesjf');
                  this.firestoreSrv.saveToken(token, user.uid);
              }).catch(error => {
                  this.isLoading = false;
                  console.log(error);
              });
              this.firestoreSrv.getCurrentUserType(user.uid).subscribe(
                  (res: any) => {
                      this.storage.set('tu', res[0] ? res[0].id_type_user : 3); // save du type user dans le storage
                      this.isLoading = false;
                      this.navCtrl.navigateRoot('/tabs/publications', {replaceUrl: true});}
              );
          }else{
              this.isLoading = false;
          }
      });*/
  }

  // les publications du type newsletter seulement
  async getListPublication() {
     this.firestoreService.getNewsletterList().subscribe(
      res => {
        this.publicationsList = res;
        // this.publicationsList.forEach(element => {
        //   console.log(element)
        // });
       });
  }

  handleLikeBtn(id_pub,currentCount){
    // pour le user en cours
    this.storage.get('uid').then((val) => {
      this.firestoreService.checkLikeStatus(id_pub,val).subscribe(
        (res:any) => { 
          console.log(res)
          console.log(res.length)
          // cet utilisateur à deja like cet article
          if(res.size > 0){
              this.firestoreService.deleteLike(id_pub,val,currentCount-1,'publication')
          }else{ // cet utilisateur n'a jamais like
              this.firestoreService.addLike(id_pub,val,currentCount+1,'publication')
          }
        }
      )
    })
    
    console.log(id_pub)
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

 

  getUserPhoto(iduser){
    return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].photo_user : ''
  }

  getName(iduser){
    return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].prenom_user : ''
  }

  getLastName(iduser){
    return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].nom_user : ''
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
