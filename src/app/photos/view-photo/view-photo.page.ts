import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { AlertController, ModalController } from '@ionic/angular';
import { LikesListModalPage } from 'src/app/modals/likes-list-modal/likes-list-modal.page';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ComListModalPage } from 'src/app/modals/com-list-modal/com-list-modal.page';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.page.html',
  styleUrls: ['./view-photo.page.scss'],
})
export class ViewPhotoPage implements OnInit {
  private photoId;
  public onePhoto;
  private userList;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private photoService: PhotoService,
              public alertController: AlertController,
              public modalController: ModalController,
              private firestoreService: FirestoreService,
              private storage: Storage) { 
                
  this.getListUsers();
              
  }

  ngOnInit() {
    this.photoId = this.route.snapshot.paramMap.get('id');
    this.photoService.getOnePhoto(this.photoId).subscribe(
      res=>{
        this.onePhoto = res[0];
        console.log(this.onePhoto)
      }
    )
    //console.log(this.photoService.oneImage)
  }

  // recuperation de tout les users
  async getListUsers(){
    this.firestoreService.getContactList().subscribe(
      res => {
        this.userList = res;
      });
  }

  // present the likes modal
  async presentModal(idPhoto) {
      
    const modal = await this.modalController.create({
      component: LikesListModalPage,
      componentProps: {
        "elt_id": idPhoto,
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

  // present the comments modal
  async presentModalComment(idPhoto) {
      
    const modal = await this.modalController.create({
      component: ComListModalPage,
      componentProps: {
        "elt_id": idPhoto,
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

  handleLikeBtn(id_photo,currentCount){
    // pour le user en cours
    this.storage.get('uid').then((val) => {
      this.firestoreService.checkLikeStatus(id_photo,val).subscribe(
        (res:any) => { 
          console.log(res)
          console.log(res.length)
          // cet utilisateur à deja like cet article
          if(res.size > 0){
              this.firestoreService.deleteLike(id_photo,val,currentCount-1,'photo')
          }else{ // cet utilisateur n'a jamais like
              this.firestoreService.addLike(id_photo,val,currentCount+1,'photo')
          }
        }
      )
    })
    
   
  }

}
