import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publications.interface';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-detail-publication',
  templateUrl: './detail-publication.page.html',
  styleUrls: ['./detail-publication.page.scss'],
})
export class DetailPublicationPage implements OnInit {
  public publication; //: Publication //: Observable<Publication>;
  public userDetails: Observable<Contact>;
  public comments = [];
  public currentUserId;
  public currentUserType;
  public new_comment ='';
  private pubId;
  constructor(
     private firestoreService: FirestoreService,
     private route: ActivatedRoute,
     private router: Router,
     private authSrv: AuthenticationService,
     public alertController: AlertController,
     private storage : Storage
  ) {
      // pour afficher ou non les boutons de modif et suppression
     this.authSrv.getCurrentUserId().then(res => {
        this.currentUserId = res.uid;
        console.log(this.currentUserId)
      })
      .catch(error => {
        console.log(error)
      });

      this.storage.get('tu').then((val) => {
        this.currentUserType = val
      });

  }

  ngOnInit() {
    this.pubId = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getPublicationDetail(this.pubId).get().subscribe(
      res => {
        this.firestoreService.setSeen(this.pubId,this.currentUserId); // passer l'article en seen
        this.publication = res.data(); // contenu de la publication
        this.userDetails = this.firestoreService.getContactDetail(res.data().id_user).valueChanges(); // details de l'utilisateur ayant créé le post
        //console.log(this.userDetails);
        this.startGettingComments(this.pubId)
      }
    )

  }

 startGettingComments(publicationId){
    this.firestoreService.getListComments(publicationId).subscribe(
      res => {
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

  modifPublication(publicationId, publisherId){
    this.router.navigate(['/tabs/publications/modif/'+ publicationId]);
  }

  deletePublication(pubId, publisherId){

  }

   async presentAlertConfirm(pubId) {
        const alert = await this.alertController.create({
            header: 'Confirmer!',
            message: 'Voulez vous vraiment <strong>supprimer</strong> cette publication et ses commentaires ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Supprimer',
                    handler: () => {
                        this.firestoreService.deletePub(pubId).then(() => {
                            this.router.navigateByUrl('tabs/publications');
                        });
                    }
                }
            ]
        });

        await alert.present();
    }



    add_comment(){
       // this.comments.length is the current count
      this.authSrv.getCurrentUserId().then(
        res => {
            this.firestoreService.addComment(this.new_comment, this.pubId, res.uid, 'com_pub').then(
                res => {
                  this.firestoreService.updateCommentCounter(this.pubId, this.comments.length,'publication')
                    //this.startGettingComments(this.pubId)
                });
            this.new_comment = '';
        }
      );

  }

    deleteComment(id_comment:string){
      console.log('gonna delete :' + id_comment);
        this.firestoreService.deleteComment(id_comment).then(
            res => {
                console.log(res)
                this.firestoreService.updateCommentCounter(this.pubId, this.comments.length,'publication')
                //this.startGettingComments(this.pubId)
            });
    }


}
