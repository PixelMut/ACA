import { Component, OnInit } from '@angular/core';
import { FirestoreService, innerJoin  } from '../services/data/firestore.service';
import { Router } from '@angular/router';
import { AngularFirestore} from 'angularfire2/firestore';
import { shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-publications',
  templateUrl: 'publications.page.html',
  styleUrls: ['publications.page.scss']
})
export class PublicationsPage implements OnInit {
  public publicationsList;

  constructor(
    private afs: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router,
    private authsrv: AuthenticationService) {
      this.publicationsList = this.afs
      .collection('publications')
      .valueChanges()
      .pipe(
        innerJoin(afs,'id_user', 'users'),
        shareReplay(1)
      );

    }

    ngOnInit() {
      // console.log('start getting publications')
      // this.publicationsList = this.firestoreService.getPublicationList().valueChanges();
      // console.log(this.publicationsList)
    }



}
