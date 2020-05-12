import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { NavController, AlertController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {
  galleryType : string; 
  type: string;
  constructor(public photoService: PhotoService,public navCtrl: NavController,private photoViewer: PhotoViewer,
    public alertController: AlertController) {
   
   }

  ngOnInit() {
   
    this.type = 'regular';
    //this.photoService.loadSaved();
  }

  segmentChanged(ev: any) {
    //console.log('Segment changed', ev);
  }

  // fonctionne en mode natif telephone 
  clickonimage(elt){
    //console.log(elt)
    // this.photoViewer.show(elt,);
    this.photoViewer.show(elt, 'Galerie Acensi', {
      share: true, 
      headers: '',
    });
  }

  // pour afficher l'image en PWA
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

  createFolder(folderName){
     console.log('fct creer dossier avec le nom :'+folderName)
    this.photoService.createFolder(folderName).then(
      res => {
        console.log(res)
      }
    )

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Créer un nouveau dossier',
      inputs: [
        {
          name: 'nameD',
          type: 'text',
          placeholder: 'Nom du dossier'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.createFolder(alertData.nameD);
          }
        }
      ]
    });

    await alert.present();
  }


}


