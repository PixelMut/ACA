import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { MiscDataService } from 'src/app/services/data/misc-data.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';


export interface Image {
  id: string;
  image: string;
}


@Component({
  selector: 'app-modif-contact',
  templateUrl: './modif-contact.page.html',
  styleUrls: ['./modif-contact.page.scss'],
})
export class ModifContactPage implements OnInit {
  public userDetails;
  public typesLocalisation: Array<any> = [];
  private userId;
  change_userinfo_form: FormGroup;
  loading: boolean = false;
  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  }

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private miscData: MiscDataService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {
    this.typesLocalisation = this.miscData.list_localisations; // Permet de connaître le type selon un id
  }

  // initialisation du formulaire et des details user
  ngOnInit() {
    this.change_userinfo_form = this.formBuilder.group({
      nom_user : new FormControl('', Validators.compose([
        Validators.required
      ])),
      prenom_user : new FormControl('', Validators.compose([
        Validators.required
      ])),
      adresse_user_code_postal : new FormControl('', Validators.compose([
        Validators.required
      ])),
      adresse_user_localite : new FormControl('', Validators.compose([
        Validators.required
      ])),
      adresse_user_rue : new FormControl('', Validators.compose([
        Validators.required
      ])),
      poste : new FormControl('', Validators.compose([
        Validators.required
      ]))
    })

    // recuperation des données user grace a son id
    this.userId = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getContactDetail(this.userId).get().subscribe(
      res => {
        this.userDetails =  res.data(); // données qui remplissent le HTML
        //console.log(this.userDetails)
      }
    )
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

        const filePath = '/Image/Profil/' + this.newImage.id ;
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then(a => {
          ref.getDownloadURL().subscribe(a => {

            this.firestoreService.updateUserImage(this.userId, a); // save de l'url dans la table user
            this.userDetails.photo_user = a;
            this.newImage.image = a;
            this.loading = false;
          });

          // this.afs.collection('Image').doc(this.newImage.id).set(this.newImage);
          this.afs.collection('Image').doc('Profil').set(this.newImage);
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

  // affiche la localisation en fonction de l'id
  getLocalisation(idlocalisation) {
    if (idlocalisation) {
       return this.typesLocalisation.filter(loc => loc.id === idlocalisation)[0].name
    }
  }

  // validation de la modification des données
  tryModify(value) {
    this.firestoreService.modifyProfil(this.userId, value)
      .then(res => {
        // console.log('saved with success')
        this.navCtrl.navigateBack('');
      },
      err => {
        console.log('error saving')
      })
  }

}
