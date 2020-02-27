import { Component, OnInit } from '@angular/core';
import { FirestoreService, innerJoin  } from '../services/data/firestore.service';
import { Router } from '@angular/router';
import { AngularFirestore} from 'angularfire2/firestore';
import { shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.page.html',
  styleUrls: ['./evenements.page.scss'],
})
export class EvenementsPage implements OnInit {
  public evntList;

  constructor(
    private afs: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router,
    private authsrv: AuthenticationService) {
    this.evntList = this.afs
      .collection('evenements')
      .valueChanges()
      .pipe(
        innerJoin(afs,'id_user', 'users'),
        shareReplay(1)
      );
   }

  ngOnInit() {
  }

  getRemainingTime(dateEvent){
    let maintenant = new Date()
    let seconds = dateEvent.seconds * 1000 - maintenant.getTime();
    return this.secondsToDhms(seconds / 1000)
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
