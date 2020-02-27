import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Image } from '../../models/image.interface'
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.page.html',
  styleUrls: ['./new-publication.page.scss'],
})
export class NewPublicationPage implements OnInit {
  public createPubForm: FormGroup;
  loading: boolean = false;
  url: any;
  fileraw: any;

  newImage: Image = {
    id: this.afs.createId(), image: ''
  }

  constructor(
    private afs: AngularFirestore,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    public formBuilder: FormBuilder,
    private router: Router,
    private storage: AngularFireStorage) {
      this.createPubForm = formBuilder.group({
        title_publication: ['', Validators.required],
        description_publication: ['', Validators.required]
      });

      // ,
      //   artistName: ['', Validators.required],
      //   songDescription: ['', Validators.required],
      //   songName: ['', Validators.required],

    }

  ngOnInit() {
  }

  async createPublication() {
     const loading = await this.loadingCtrl.create();
     const publicationName = this.createPubForm.value.title_publication;
     const publicationDesc = this.createPubForm.value.description_publication;

     this.firestoreService
    .createPublication(publicationName, publicationDesc, this.newImage.id, this.fileraw)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/tabs/publications');
        });
      },
      error => {
        console.error(error);
      }
    );

     return await loading.present();
  }

   // lors du choix de l'image depuis le champ "upload"
  uploadImage(event) {
    this.loading = true;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      // For Preview Of Image
      reader.onload = (e:any) => { // called once readAsDataURL is completed
        this.url = e.target.result;
        // For Uploading Image To Firebase
        this.fileraw = event.target.files[0];
      }
    }
  }

 
}
