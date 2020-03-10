import {Component, NgZone, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.interface';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { Publication } from 'src/app/models/publications.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {Storage} from "@ionic/storage";

export interface Image {
  id: string;
  image: string;
}

@Component({
  selector: 'app-modif-evenement',
  templateUrl: './modif-evenement.page.html',
  styleUrls: ['./modif-evenement.page.scss'],
})
export class ModifEvenementPage implements OnInit {
  // localisation
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;

  private currentUserType;
  public evenement; //: Publication;
  public comments = [];
  public modifEvntForm: FormGroup;
  public evenementId;
  loading: boolean = false;
  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  };
  public displayedDate: String;
  date_min: String = new Date().toISOString();
  constructor(
    public zone: NgZone,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private localstorage : Storage,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private router: Router) {

    this.modifEvntForm = this.formBuilder.group({
      title_evnt: ['', Validators.required],
      description_evnt: ['', Validators.required],
      datetime_evnt : ['', Validators.required]
    });

    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    this.evenementId = this.route.snapshot.paramMap.get('id');

    this.firestoreService.getEvenementDetail(this.evenementId).get().subscribe(
        res => {
          this.evenement = res.data();
          this.autocomplete.input = this.evenement.lieu_evnt;
          this.displayedDate = new Date(this.evenement.date_evnt.seconds *1000).toISOString();
          //this.userDetails = this.firestoreService.getContactDetail(res.data().id_user).valueChanges()
        }
    );

    this.localstorage.get('tu').then((val) => {
      this.currentUserType = val
    });


  }

  ngOnInit() {

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
        const fileraw = event.target.files[0];
        console.log(fileraw)
        // const filePath = '/Image/' + this.newImage.id + '/' + 'Image' + (Math.floor(1000 + Math.random() * 9000) + 1);

        const filePath = '/Image/' + 'Evnt_' + this.evenementId + '/' + this.newImage.id ;
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then(a => {
          ref.getDownloadURL().subscribe(a => {

            this.firestoreService.updateEvntImage(this.evenementId, a); // save de l'url dans la table user
           this.evenement.photo_evnt = a;
            this.newImage.image = a;
            this.loading = false;
          });

          // this.afs.collection('Image').doc(this.newImage.id).set(this.newImage);
          this.afs.collection('Image').doc('Evnt_'+ this.evenementId).set(this.newImage);
        });
      }
    }
  }

  SaveImageRef(filePath, file) {
    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
  }


  async modifEvenement() {
    const loading = await this.loadingCtrl.create();
    const evenementName = this.modifEvntForm.value.title_evnt;
    const evenementDesc = this.modifEvntForm.value.description_evnt;
    const evntDate = this.modifEvntForm.value.datetime_evnt;

    this.firestoreService
    .modifyEvenement(this.evenementId, evenementName, evenementDesc, (this.location ? this.location.description : ''), (this.placeid ? this.placeid : ''), evntDate, this.currentUserType )
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
    //console.log(item)
    this.location = item
    this.placeid = this.location.place_id
    //console.log('placeid'+ this.placeid)
    this.autocompleteItems = []
  }

}
