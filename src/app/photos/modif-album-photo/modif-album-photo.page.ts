import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService, MyData } from 'src/app/services/photo.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-modif-album-photo',
  templateUrl: './modif-album-photo.page.html',
  styleUrls: ['./modif-album-photo.page.scss'],
})
export class ModifAlbumPhotoPage implements OnInit {
  private albumId;
  public images: Observable<MyData[]>;
  public currentUserType;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private photoService: PhotoService,
              public alertController: AlertController,
              private storage : Storage) { 


      this.storage.get('tu').then((val) => {
        this.currentUserType = val
      });

    }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
    // on veut toutes les photos
    if(this.albumId === 'all'){
      this.photoService.getAlbumAll()
    }else{ // seulement celles de l'album selectionné
      this.photoService.getAlbumPhoto(this.albumId)
    }
   
  }

  async presentAlert(mapUrl, elt) {
    const alert = await this.alertController.create({
      message: `<img src="${mapUrl}" alt="g-maps" style="border-radius: 0px">`,
      buttons: [
        {
          text: 'Supprimer',
          cssClass: 'danger',
          handler: (blah) => {
           this.photoService.deletePicture(elt)
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }



  async presentAlertConfirm(idalbum) {
    const alert = await this.alertController.create({
        header: 'Confirmer!',
        message: 'Voulez vous vraiment <strong>supprimer</strong> cet album, ses photos et ses commentaires ?',
        buttons: [
            {
                text: 'Annuler',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                }
            }, {
                text: 'Supprimer',
                handler: () => {
                    this.photoService.deleteAlbum(idalbum).then((res) => {
                        //console.log(res)
                        this.router.navigateByUrl('tabs/photos');
                    });
                }
            }
        ]
    });

    await alert.present();
}


}
