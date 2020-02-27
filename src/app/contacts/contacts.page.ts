import { Component, OnInit } from '@angular/core';
import { FirestoreService, innerJoin } from '../services/data/firestore.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  public contactsList;
  public fullContactList;
  testc;

  constructor(
      private afs: AngularFirestore,
      private firestoreService: FirestoreService,
      private router: Router
  ) {
    // this.testc = this.afs
    //   .doc('users/554cnr4Ln6WEAuYmsRk9')
    //   .valueChanges()
    //   .pipe(
    //     docJoin(afs, { id_type_user: 'type_user' }),

    //   );

    // this.testc = this.afs
    //   .collection('publications')
    //   .valueChanges()
    //   .pipe(
    //     innerJoin(afs,'id_user', 'users'),
    //     shareReplay(1)
    //   );


   }

  ngOnInit() {
    this.firestoreService.getContactList().subscribe(elt=>{
      this.fullContactList =  elt
      this.contactsList = this.fullContactList
    })
  }

  onSearchTerm(event){
    this.contactsList = this.fullContactList
    const val = event.detail.value;

    if (val && val.trim() !== '') {
      this.contactsList = this.contactsList.filter(term => {
        return ( term.nom_user.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 || term.prenom_user.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 )
      });
    }
  }

}
