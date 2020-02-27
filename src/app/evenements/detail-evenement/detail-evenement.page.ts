import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publications.interface';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(
     private firestoreService: FirestoreService,
     private route: ActivatedRoute,
     private router: Router,
     private authSrv: AuthenticationService
  ) {
    this.authSrv.getCurrentUserId().then(res => {
        this.currentUserId = res.uid;
      })
      .catch(error => {
        console.log(error)
      })
  }

  ngOnInit() {
    const evntId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getEvenementDetail(evntId).get().subscribe(
      res => {
        this.evenement = res.data();
        this.userDetails = this.firestoreService.getContactDetail(res.data().id_user).valueChanges()
        this.startGettingComments(evntId)
      }
    )
  }

   startGettingComments(evenementId){
    this.firestoreService.getEvenementComments(evenementId).get().subscribe(
      res => {
        res.docs.forEach(elt => {
          // this.comments.push(elt.data()) // compose la liste des commentaires
          this.comments.push({
            user_name : this.firestoreService.getContactDetail(elt.data().id_user).valueChanges(),
            user_photo : 'photo',
            commentcontent : elt.data().comment_content
          })
        })
      }
    )
  }

  modifEvenement(evenementId, publisherId){
    this.router.navigate(['/tabs/evenements/modif/'+evenementId]);
    console.log(evenementId);
    console.log(publisherId);

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

}