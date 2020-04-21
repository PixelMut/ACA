import { Component, OnInit } from '@angular/core';
import {NavParams} from "@ionic/angular";
import {FirestoreService} from "../../services/data/firestore.service";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  notifList = [];
  userList = [];
  constructor(private navParams: NavParams,
              private firestoreService: FirestoreService) {
    //console.log(navParams.get('data'))
  }

  ngOnInit() {
    this.notifList = this.navParams.get('data');
    this.userList = this.navParams.get('userList');
    this.firestoreService.changeStateToSeen(this.notifList);
  }

  getName(iduser){
    let prenom = this.userList.filter( elt => elt.id_user === iduser)[0]
    if(prenom){
      return prenom.prenom_user;
    }else{
      return 'Utilisateur Acensi'
    }
    // return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].prenom_user : ''
  }
}
