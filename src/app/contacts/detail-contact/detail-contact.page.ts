import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.interface';
import { MiscDataService } from 'src/app/services/data/misc-data.service';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {
  public contact: Observable<Contact>;
  public typesLocalisation: Array<any> = [];

  constructor(
     private firestoreService: FirestoreService,
     private route: ActivatedRoute,
     private miscData: MiscDataService
  ) {
    this.typesLocalisation = this.miscData.list_localisations; // Permet de connaître le type selon un id
   }

  ngOnInit() {
    const contactId: string = this.route.snapshot.paramMap.get('id');
    this.contact = this.firestoreService.getContactDetail(contactId).valueChanges();
   // console.log(this.contact)
  }

  getLocalisation(idlocalisation) {
    if (idlocalisation) {
       return this.typesLocalisation.filter(loc => loc.id === idlocalisation)[0].name
    }
  }

}
