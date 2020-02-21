import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-publication',
  templateUrl: './new-publication.page.html',
  styleUrls: ['./new-publication.page.scss'],
})
export class NewPublicationPage implements OnInit {
  public createPubForm: FormGroup;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router) {
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
    .createPublication(publicationName, publicationDesc)
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

}
