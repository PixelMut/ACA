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
  text1 = ' a publié une ';
  constructor(private navParams: NavParams,
              private firestoreService: FirestoreService) {
    //console.log(navParams.get('data'))
  }

  ngOnInit() {
    this.notifList = this.navParams.get('data');
    this.userList = this.navParams.get('userList');
    console.log(this.notifList);
  }

  getName(iduser){
    return this.userList ? this.userList.filter( elt => elt.id_user === iduser)[0].nom_user : ''
  }
}
