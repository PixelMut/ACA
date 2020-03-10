import { Component } from '@angular/core';
import {FirestoreService} from "../services/data/firestore.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public nbEventToCome;

  constructor(private firestoreService: FirestoreService) {
    firestoreService.isAnyEvent().subscribe(
        res => {
          //console.log(res)
          this.nbEventToCome = res.length;
        })


  }

}
