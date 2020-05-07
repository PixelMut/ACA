import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface MyData {
  name: string;
  filepath: string;
  size: number;
  uploadDate : Date
}

class Photo {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private imageCollection: AngularFirestoreCollection<MyData>;
  public photos: Photo[] = [];

    // Upload Task 
    task: AngularFireUploadTask;
    // Progress in percentage
    percentage: Observable<number>;
    // Snapshot of uploading file
    snapshot: Observable<any>;
    // Uploaded File URL
    UploadedFileURL: Observable<string>;
    //Uploaded Image List
    images: Observable<MyData[]>;
    //File details  
    fileName:string;
    fileSize:number;
    //Status check 
    isUploading:boolean;
    isUploaded:boolean;


  constructor(private camera: Camera,private storage: AngularFireStorage,private database: AngularFirestore) { 
    this.isUploading = false;
    this.isUploaded = false;
    //Set collection where our documents/ images info will save
    // this.imageCollection = database.collection<MyData>('freakyImages');
    this.imageCollection = database.collection<MyData>('ACA_Gallery', ref => ref.orderBy('uploadDate','desc'));


    this.images = this.imageCollection.valueChanges();

  }

  // takePicture() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //         // Add new photo to gallery
  //         this.photos.unshift({
  //           data: 'data:image/jpeg;base64,' + imageData
  //         });
    
  //         // Save all photos for later viewing
  //         this.storage.set('photos', this.photos);
  //   }, (err) => {
  //     // Handle error
  //     console.log("Camera issue:" + err);
  //   });
  // }

  // loadSaved() {
  //   this.storage.get('photos').then((photos) => {
  //     this.photos = photos || [];
  //   });
  // }

  uploadFile(event: FileList) {
    
 
    // The File object
    const file = event.item(0)
 
    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') { 
     console.error('unsupported file type :( ')
     return;
    }
 
    this.isUploading = true;
    this.isUploaded = false;
 
 
    this.fileName = file.name;
 
    // The storage path
    const path = `ACA_Gallery/${new Date().getTime()}_${file.name}`;
 
    // Totally optional metadata
    const customMetadata = { app: 'Freaky Image Upload Demo' };
 
    //File reference
    const fileRef = this.storage.ref(path);
 
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });
 
    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
        
        this.UploadedFileURL.subscribe(resp=>{
          this.addImagetoDB({
            name: file.name,
            filepath: resp,
            size: this.fileSize,
            uploadDate : new Date()
          });
          this.isUploading = false;
          // this.isUploaded = true;
          this.isUploaded = false;
        },error=>{
          console.error(error);
        })
      }),
      tap(snap => {
          this.fileSize = snap.totalBytes;
      })
    )
  }

  addImagetoDB(image: MyData) {
    //Create an ID for document
    const id = this.database.createId();
 
    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }


}
