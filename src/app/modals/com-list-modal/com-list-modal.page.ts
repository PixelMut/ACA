import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-com-list-modal',
  templateUrl: './com-list-modal.page.html',
  styleUrls: ['./com-list-modal.page.scss'],
})
export class ComListModalPage implements OnInit {
  private userList;
  public comments = [];
  public new_comment =''; // rempli par ngmodel
  private photoId;
  public currentUserId;
  public currentUserType;

  constructor(private navParams: NavParams,
              private modalController: ModalController,
              private firestoreService: FirestoreService,
              private storage: Storage) { }

  ngOnInit() {
    this.userList = this.navParams.data.userList;
    this.photoId = this.navParams.data.elt_id;
    this.startGettingComments(this.photoId);

    // get current user id
    this.storage.get('uid').then((val) => {
      this.currentUserId = val
    });

    // get current user type
    this.storage.get('tu').then((val) => {
      this.currentUserType = val
    });
  }

  startGettingComments(photoId){
    this.firestoreService.getListComments(photoId).subscribe(
      res => {
        console.log(res)
          this.comments = [];
        res.forEach((elt:any) => {
          // this.comments.push(elt.data()) // compose la liste des commentaires
          this.comments.push({
            id_comment : elt.id_comment,
            comment_creator : elt.id_user,
            user_name : this.firestoreService.getContactDetail(elt.id_user).valueChanges(),
            commentcontent : elt.comment_content,
            commentDate : elt.date_comment,
          });
        });
      });
  }

  add_comment(){
    // this.comments.length is the current count
  // this.storage.get('uid').then((val) => {
    // console.log(val)
    this.firestoreService.addComment(this.new_comment, this.photoId, this.currentUserId, 'com_photo').then(
      res => {
        console.log(res)
        this.firestoreService.updateCommentCounter(this.photoId, this.comments.length,'photo')
          //this.startGettingComments(this.pubId)
      });
    this.new_comment = '';
  // });

  //  this.authSrv.getCurrentUserId().then(
  //    res => {
  //        this.firestoreService.addComment(this.new_comment, this.pubId, res.uid, 'com_pub').then(
  //            res => {
  //              this.firestoreService.updateCommentCounter(this.pubId, this.comments.length)
  //                //this.startGettingComments(this.pubId)
  //            });
  //        this.new_comment = '';
  //    }
  //  );

}


deleteComment(id_comment:string){
  console.log('gonna delete :' + id_comment);
    this.firestoreService.deleteComment(id_comment).then(
        res => {
            console.log(res)
            this.firestoreService.updateCommentCounter(this.photoId, this.comments.length,'photo')
            //this.startGettingComments(this.pubId)
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
