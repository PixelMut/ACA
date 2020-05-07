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
    console.log('Segment changed', ev);
  }

  clickonimage(elt){
    console.log(elt)
    // this.photoViewer.show(elt,);
    this.photoViewer.show(elt, 'Galerie Acensi', {
      share: true, 
      headers: '',
    });
  }

  async presentAlert(mapUrl) {
    const alert = await this.alertController.create({
      message: `<img src="${mapUrl}" alt="g-maps" style="border-radius: 0px">`,
      buttons: ['OK']
    });

    await alert.present();
  }

  test(){
     
  }

}


