import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publications.interface';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact.interface';

@Component({
  selector: 'app-detail-publication',
  templateUrl: './detail-publication.page.html',
  styleUrls: ['./detail-publication.page.scss'],
})
export class DetailPublicationPage implements OnInit {
  public publication //: Publication //: Observable<Publication>;
  public userDetails: Observable<Contact>;
  public comments = [];

  constructor(
     private firestoreService: FirestoreService,
     private route: ActivatedRoute
  ) { 

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




}
