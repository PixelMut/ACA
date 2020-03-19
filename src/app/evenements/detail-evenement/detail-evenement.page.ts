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
  selector: 'app-detail-evenement',
  templateUrl: './detail-evenement.page.html',
  styleUrls: ['./detail-evenement.page.scss'],
})
export class DetailEvenementPage implements OnInit {
  public evenement //: Publication //: Observable<Publication>;
  public userDetails: Observable<Contact>;
  public comments = [];
  public currentUserId;
  public currentUserType;
  public new_comment ='';
  private evntId;

  constructor(
     private firestoreService: FirestoreService,
     private route: ActivatedRoute,
     private router: Router,
     private authSrv: AuthenticationService,
     public alertController: AlertController,
     private storage : Storage
  ) {
     this.authSrv.getCurrentUserId().then(res => {
        this.currentUserId = res.uid;
      })
      .catch(error => {
        console.log(error)
      })

      this.storage.get('tu').then((val) => {
          this.currentUserType = val
      });
  }

  ngOnInit() {
    this.evntId = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getEvenementDetail(this.evntId).get().subscribe(
      res => {
            this.firestoreService.setSeen(this.evntId,this.currentUserId); // passer l'article en seen
            this.evenement = res.data(); // contenu de l'event
            this.userDetails = this.firestoreService.getContactDetail(res.data().id_user).valueChanges(); // detail de l'utilisateur ayant créé l'event

            // recuperation des commentaires
            this.startGettingComments(this.evntId)
      }
    )
  }

   startGettingComments(evenementId){
    this.firestoreService.getEvenementComments(evenementId).subscribe(
      res => {
        this.comments = [];
        res.forEach((elt:any) => {
          // this.comments.push(elt.data()) // compose la liste des commentaires
          this.comments.push({
            user_name : this.firestoreService.getContactDetail(elt.id_user).valueChanges(),
            commentcontent : elt.comment_content,
            commentDate : elt.date_comment
          })
        })
      }
    )
  }

  modifEvenement(evenementId, publisherId){
    this.router.navigate(['/tabs/evenements/modif/'+ evenementId]);
  }

  activeEvent(evntId){
      this.firestoreService.activateEvnt(evntId).then(() => {
          this.router.navigateByUrl('tabs/evenements');
      });
  }

  async presentAlertConfirm(evntId) {
    const alert = await this.alertController.create({
        header: 'Confirmer!',
        message: 'Voulez vous vraiment <strong>supprimer</strong> cet évènement et ses commentaires ?',
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
                    this.firestoreService.deleteEvnt(evntId).then(() => {
                        this.router.navigateByUrl('tabs/evenements');
                    });
                }
            }
        ]
    });

    await alert.present();
  }

    async presentAlertConfirmAbort(evntId) {
        const alert = await this.alertController.create({
            header: 'Confirmer!',
            message: 'Voulez vous vraiment <strong>annuler</strong> cet évènement ?',
            buttons: [
                {
                    text: 'Non',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Oui',
                    handler: () => {
                        this.firestoreService.cancelEvent(evntId).then(() => {
                            this.router.navigateByUrl('tabs/evenements');
                        });
                    }
                }
            ]
        });

        await alert.present();
    }


  getRemainingTime(dateEvent){
    if (dateEvent) {
      let maintenant = new Date()
      let seconds = dateEvent.seconds * 1000 - maintenant.getTime();
      return this.secondsToDhms(seconds / 1000)
    } else {
      return ''
    }
  }

  secondsToDhms(seconds) {
    seconds = Number(seconds);
    let d = Math.floor(seconds / (3600 * 24));
    let h = Math.floor(seconds % (3600 * 24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? d + (d === 1 ? ' jour, ' : ' jours, ') : '';
    let hDisplay = h > 0 ? h + (h === 1 ? ' heure, ' : ' heures, ') : '';
    let mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes ') : '';
    // let sDisplay = s > 0 ? s + (s === 1 ? ' seconde' : ' secondes') : '';
    return dDisplay + hDisplay + mDisplay // + sDisplay;
  }

  add_comment(){
    this.authSrv.getCurrentUserId().then(
        res => {
          this.firestoreService.addComment(this.new_comment, this.evntId, res.uid, 'com_evnt').then(
              res => {
                //this.startGettingComments(this.pubId)
              });
          this.new_comment = '';
        }
    );

  }

}
