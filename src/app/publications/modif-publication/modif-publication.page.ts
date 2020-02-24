import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.interface';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { Publication } from 'src/app/models/publications.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';

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

  constructor(
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
