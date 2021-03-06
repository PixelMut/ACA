import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.interface';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { Publication } from 'src/app/models/publications.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Image } from '../../models/image.interface'

@Component({
  selector: 'app-modif-publication',
  templateUrl: './modif-publication.page.html',
  styleUrls: ['./modif-publication.page.scss'],
})
export class ModifPublicationPage implements OnInit {
  public publication //: Publication;
  public userDetails: Observable<Contact>;
  public comments = [];
  public modifPubForm: FormGroup;
  public publicationId;
  loading: boolean = false;
  url: any;
  newImage: Image = {
    id: this.afs.createId(), image: ''
  }


  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private router: Router) {
     }

  ngOnInit() {
    this.modifPubForm = this.formBuilder.group({
      title_publication: ['', Validators.required],
      description_publication: ['', Validators.required]
    });

    this.publicationId = this.route.snapshot.paramMap.get('id');
    console.log(this.publicationId);
    this.firestoreService.getPublicationDetail(this.publicationId).get().subscribe(
      res => {
        this.publication = res.data()
        console.log(this.publication)
        //this.userDetails = this.firestoreService.getContactDetail(res.data().id_user).valueChanges()
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

        const filePath = '/Image/' + 'Post_' + this.publicationId + '/' + this.newImage.id ;
        const result = this.SaveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then(a => {
          ref.getDownloadURL().subscribe(a => {

            this.firestoreService.updatePubImage(this.publicationId, a); // save de l'url dans la table user
           this.publication.photo_publication = a;
            this.newImage.image = a;
            this.loading = false;
          });

          // this.afs.collection('Image').doc(this.newImage.id).set(this.newImage);
          this.afs.collection('Image').doc('Post_'+ this.publicationId).set(this.newImage);
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


    async modifPublication() {
     const loading = await this.loadingCtrl.create();
     const publicationName = this.modifPubForm.value.title_publication;
     const publicationDesc = this.modifPubForm.value.description_publication;

     this.firestoreService
    .modifyPublication(this.publicationId, publicationName, publicationDesc)
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
