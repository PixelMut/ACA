import { Component } from '@angular/core';
import {FirestoreService} from "../services/data/firestore.service";
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../notif-component/popover/popover.component';
import {Storage} from '@ionic/storage';
import { MiscDataService } from '../services/data/misc-data.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public nbEventToCome;
  private notifList;
  private userList;
  public newItems;
  constructor(private firestoreService: FirestoreService,
    public popoverController: PopoverController,
    private storage: Storage,private miscDataService : MiscDataService) {
    firestoreService.isAnyEvent().subscribe(
        res => {
          //console.log(res)
          this.nbEventToCome = res.length;
        })

        this.getListUsers();
        this.getNotifs();

  }

  async seeNotif(ev:any){
    const popover = await this.popoverController.create({
        component: PopoverComponent,
        event: ev,
        translucent: false,
        componentProps : { data : this.notifList, userList : this.userList },
        cssClass : 'pop-over-style'
    });
    return await popover.present();
}

async getListUsers(){
  this.firestoreService.getContactList().subscribe(
    res => {
      this.userList = res;
    });
}

getNotifs(){
  //console.log('get notifs')
    this.storage.get('uid').then((val) => {
        //console.log('get notif for id user:'+ val)

        this.firestoreService.isAnyNotif(val).subscribe(
            res => {
                this.notifList = res;
                this.newItems =  this.notifList.filter(x => x.is_new === true);
            })
    });

}

onTop() {
  this.miscDataService.publishSomeData({
      foo: 'bar'
  });
}

}
