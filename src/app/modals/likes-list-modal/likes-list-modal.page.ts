import { Component, OnInit } from '@angular/core';
import { 
  ModalController, 
  NavParams 
  } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';
   
@Component({
  selector: 'app-likes-list-modal',
  templateUrl: './likes-list-modal.page.html',
  styleUrls: ['./likes-list-modal.page.scss'],
})
export class LikesListModalPage implements OnInit {
  public likelist;
  private userList;
  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private firestoreService: FirestoreService) { }

  ngOnInit() {
    // console.log(this.navParams);
    // console.log(this.navParams.data.elt_id);
    // console.log(this.navParams.data.userList);
    this.userList = this.navParams.data.userList;
    this.firestoreService.getLikesList(this.navParams.data.elt_id).subscribe(
      res => {
        console.log(res)
        this.likelist = res;
        // this.publicationsList.forEach(element => {
        //   console.log(element)
        // });
       });
  }

  

  async closeModal() {
    // const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss();
  }

  getName(iduser){
    return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].prenom_user : ''
  }

  getLastName(iduser){
    return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].nom_user : ''
  }

  getImage(iduser){
    return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].photo_user : ''

  }

  
}
