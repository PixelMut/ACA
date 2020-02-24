import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publications.interface';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-detail-publication',
  templateUrl: './detail-publication.page.html',
  styleUrls: ['./detail-publication.page.scss'],
})
export class DetailPublicationPage implements OnInit {
  public publication //: Publication //: Observable<Publication>;
  public userDetails: Observable<Contact>;
  public comments = [];
  public curentUserId;

  constructor(
     private firestoreService: FirestoreService,
     private route: ActivatedRoute,
     private router: Router,
     private authSrv: AuthenticationService
  ) {
     this.authSrv.getCurrentUserId().then(res => {
        this.curentUserId = res.uid;
      })
      .catch(error => {
        console.log(error)
      })

   
  }

  ngOnInit() {
    const pubId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getPublicationDetail(pubId).get().subscribe(
      res => {
        this.publication = res.data();
        this.userDetails = this.firestoreService.getContactDetail(res.data().id_user).valueChanges()
        this.startGettingComments(pubId)
      }
    )

  }

 startGettingComments(publicationId){
    this.firestoreService.getPublicationComments(publicationId).get().subscribe(
      res => {
        res.docs.forEach(elt => {
          // this.comments.push(elt.data()) // compose la liste des commentaires
          this.comments.push({
            user_name : this.firestoreService.getContactDetail(elt.data().id_user).valueChanges(),
            user_photo : 'photo',
            commentcontent : elt.data().comment_content
          })
        })
      }
    )
  }

  modifPublication(publicationId, publisherId){
    this.router.navigate(['/tabs/publications/modif/'+publicationId]);
    console.log(publicationId);
    console.log(publisherId);

  }


}
