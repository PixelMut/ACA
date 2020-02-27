import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';
import { Image } from '../../models/image.interface'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-new-evenement',
  templateUrl: './new-evenement.page.html',
  styleUrls: ['./new-evenement.page.scss'],
})
export class NewEvenementPage implements OnInit {

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;


  public createEvntForm: FormGroup;
  loading: boolean = false;
    url: any;
    fileraw: any;
  previewUrl;
    newImage: Image = {
      id: this.afs.createId(), image: ''
    }

  constructor(
    public zone: NgZone,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    public formBuilder: FormBuilder,
    private router: Router) {
      this.createEvntForm = formBuilder.group({
        title_evnt: ['', Validators.required],
        description_evnt: ['', Validators.required],
        datetime_evnt : ['', Validators.required]
      });

      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];
    }

      updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      if (predictions) {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }

    });
  }
  selectSearchResult(item) {
    console.log(item)
    this.location = item
    this.placeid = this.location.place_id
    console.log('placeid'+ this.placeid)
    this.autocompleteItems = []
  }

  // GoTo(){
  //   return window.location.href = 'https://www.google.com/maps/place/?q=place_id:'+this.placeid;
  // }

  ngOnInit() {
  }

  async createEvenement() {
     const loading = await this.loadingCtrl.create();
     const evntName = this.createEvntForm.value.title_evnt;
     const evntDesc = this.createEvntForm.value.description_evnt;
     const evntDate = this.createEvntForm.value.datetime_evnt;

     console.log(evntDate)
     this.firestoreService
    .createEvenement(evntName, evntDesc, this.newImage.id, this.fileraw,this.location.description, this.placeid, evntDate )
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/tabs/evenements');
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
        // console.log(this.fileraw)
        // const filePath = '/Image/'  + this.newImage.id ;
        // const result = this.SaveImageRef(filePath, this.fileraw);
        // const ref = result.ref;
        // result.task.then(a => {
        //   ref.getDownloadURL().subscribe(a => {
        //     this.previewUrl = a;
        //   });
          
        // });
      }
    }
  }

   SaveImageRef(filePath, file) {
    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
  }



}
