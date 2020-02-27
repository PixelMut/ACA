import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.interface';
import { MiscDataService } from 'src/app/services/data/misc-data.service';

import { NavController, Platform } from '@ionic/angular';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit{
  public contact: Observable<Contact>;
  public typesLocalisation: Array<any> = [];

  constructor(
     private firestoreService: FirestoreService,
     private route: ActivatedRoute,
     private miscData: MiscDataService,
     private navCtrl : NavController,
     private platform : Platform,
     private emailComposer: EmailComposer
  ) {
    this.typesLocalisation = this.miscData.list_localisations; // Permet de connaître le type selon un id
   }

   ionViewWillEnter(){
       //this.platform.backButton.
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

  sendMail(email){
    email.subscribe(
      res => {
        this.emailComposer.isAvailable().then((available: boolean) =>{
          if(available) {
            let mail = {
              to: res.adresse_mail,
              subject: 'Contact - Acensi Community App',
              body: '',
              isHtml: true
            }

            // Send a text message using default options
            this.emailComposer.open(mail);
          }
        });
      }
    )


  }

}
