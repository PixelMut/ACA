import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService, MyData } from 'src/app/services/photo.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modif-album-photo',
  templateUrl: './modif-album-photo.page.html',
  styleUrls: ['./modif-album-photo.page.scss'],
})
export class ModifAlbumPhotoPage implements OnInit {
  private albumId;
  public images: Observable<MyData[]>;

  constructor(private route: ActivatedRoute,
    private router: Router,private photoService: PhotoService,public alertController: AlertController) { }

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


}
