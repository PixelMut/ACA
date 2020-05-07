import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { Router } from '@angular/router';
import { Image } from '../../models/image.interface'
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {Storage} from "@ionic/storage";
import {google} from 'google-maps';

@Component({
  selector: 'app-new-evenement',
  templateUrl: './new-evenement.page.html',
  styleUrls: ['./new-evenement.page.scss'],
})
export class NewEvenementPage implements OnInit {


  @ViewChild('defaultPictures', {static: false}) defaultPicture: any;

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  public currentUserType;
  location: any;
  placeid: any;

  date_min: String = new Date().toISOString();
  public createEvntForm: FormGroup;
  loading: boolean = false;
    url: any;
    fileraw: any;
  previewUrl;
    newImage: Image = {
      id: this.afs.createId(), image: ''
    };

  public defaultImages = [
    'https://firebasestorage.googleapis.com/v0/b/acensi-community-app.appspot.com/o/Image%2Fworkshop.jpg?alt=media&token=6817aa79-582d-4ccc-9e1a-942be76d9b13',
    'https://firebasestorage.googleapis.com/v0/b/acensi-community-app.appspot.com/o/Image%2Ffootball-3471402_640.jpg?alt=media&token=08459b9b-2620-4d58-ac92-358dea2a6852',
    'https://firebasestorage.googleapis.com/v0/b/acensi-community-app.appspot.com/o/Image%2Frestaurant-691397_640.jpg?alt=media&token=aedc3910-f120-4f12-aa0a-a085563f91c1',
    'https://firebasestorage.googleapis.com/v0/b/acensi-community-app.appspot.com/o/Image%2Fglasses-919071_640.jpg?alt=media&token=beb81afa-205a-445c-8710-84ed5d96b7f8',
    'https://firebasestorage.googleapis.com/v0/b/acensi-community-app.appspot.com/o/Image%2Fconcert-2527495_640.jpg?alt=media&token=52cb9b8a-63f5-4726-98a1-d959410c3060'
  ];

  constructor(
    public zone: NgZone,
    private afs: AngularFirestore,
    private storage : Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    public formBuilder: FormBuilder,
    private router: Router) {
      this.createEvntForm = formBuilder.group({
        title_evnt: ['', Validators.required],
        description_evnt: ['', Validators.required],
        datetime_evnt : ['', Validators.required],
        evnt_official : [false, Validators.required]
      });

      this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
      this.autocomplete = { input: '' };
      this.autocompleteItems = [];

      this.storage.get('tu').then((val) => {
          this.currentUserType = val
          if(this.currentUserType === 1 || this.currentUserType === 2 ){
            this.createEvntForm.value.evnt_official = true;
          }
      });
    }

    
  ngOnInit() {
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


  async createEvenement() {
     const loading = await this.loadingCtrl.create();
     const evntName = this.createEvntForm.value.title_evnt;
     const evntDesc = this.createEvntForm.value.description_evnt;
     const evntDate = this.createEvntForm.value.datetime_evnt;
     const isOfficial = this.createEvntForm.value.evnt_official;
     //console.log(this.currentUserType)
     //console.log(this.newImage.id) // id generé automatiquement au chargement de la page
     //console.log(this.url) // si une photo est selectionnée dans la biblio
     //console.log(this.fileraw) // // si une photo est selectionnée dans la biblio

     // on a choisi une image par defaut
     if(this.url === '' || this.url === undefined){
      // console.log('default image')
       this.defaultPicture.getActiveIndex().then(res => {
        const def = this.defaultImages[res]
        console.log(def) // correspond à l'index de l'image choisie
        this.firestoreService
        .createEvenement(evntName, evntDesc, def, this.fileraw,(this.location ? this.location.description : ''), (this.placeid ? this.placeid : ''), evntDate, this.currentUserType, isOfficial ,true)
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
      })

     }else{ // selection d'une image dans la biblio
      this.firestoreService
        .createEvenement(evntName, evntDesc, this.newImage.id, this.fileraw,(this.location ? this.location.description : ''), (this.placeid ? this.placeid : ''), evntDate, this.currentUserType, isOfficial )
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
     }


     return await loading.present();
  }

  test(){
    
    this.defaultPicture.getActiveIndex().then(res => {
      console.log(res) // correspond à l'index de l'image choisie
    })
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
