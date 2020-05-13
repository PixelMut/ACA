import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface MyData {
  id_photo:string;
  name: string;
  filepath: string;
  size: number;
  uploadDate : Date,
  id_parent : string,
  nblike: number,
  nbcom:number
}

class Photo {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private allImageCollection: AngularFirestoreCollection<MyData>;
  private filteredImageCollection: AngularFirestoreCollection<MyData>;
  private folderCollection :AngularFirestoreCollection<any>;
  public photos: Photo[] = [];

    // Upload Task 
    task: AngularFireUploadTask;
    // Progress in percentage
    percentage: Observable<number>;
    // Snapshot of uploading file
    snapshot: Observable<any>;
    // Uploaded File URL
    UploadedFileURL: Observable<string>;
    //Uploaded Image and Folder List
    images: Observable<MyData[]>;
    filteredImages : Observable<MyData[]>;
    folders : Observable<any>;
    oneImage : Observable<any>;
    
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
    
    // pour recup toutes les photos
    this.allImageCollection = database.collection<MyData>('ACA_Gallery', ref => ref.orderBy('uploadDate','desc'));
    this.images = this.allImageCollection.valueChanges();


    // pour recup les dossiers
    this.folderCollection = database.collection<MyData>('ACA_Gallery_Parents');
    this.folders = this.folderCollection.valueChanges();
  }

  createFolder(fname){
    const id_parent = fname;
    const datedujour = new Date();
    const iddoc = this.database.createId();
    return new Promise<any>((resolve, reject) => {
      this.database.doc(`ACA_Gallery_Parents/${iddoc}`).set({
        id_parent,
        creation_date : datedujour
      })
      .then(
        res => {
          resolve('ok');
        },
        err => reject(err));
    });
  }

  getAlbumAll(){
    // pour recup toutes les photos
    this.filteredImageCollection = this.database.collection<MyData>('ACA_Gallery', ref => ref.orderBy('uploadDate','desc'));
    this.filteredImages = this.allImageCollection.valueChanges();
  }

  getAlbumPhoto(idalbum){
    console.log('getting photos of :'+ idalbum)
    this.filteredImageCollection = this.database.collection<MyData>('ACA_Gallery', ref => ref.orderBy('uploadDate','desc').where('id_parent', '==' , idalbum));
    this.filteredImages = this.filteredImageCollection.valueChanges();


  }

  getOnePhoto(idphoto){
    return this.database.collection<MyData>('ACA_Gallery', ref => ref.where('id_photo', '==' , idphoto)).valueChanges();
    // let test = this.database.collection<MyData>('ACA_Gallery', ref => ref.where('id_photo', '==' , idphoto));
    // return test.get();


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

  uploadFile(event: FileList, albumName ='all') {
    console.log('gonna add picture : '+event+ ' / album : ' + albumName)
 
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
    console.log('filename :'+this.fileName)
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
    console.log('1')
    this.snapshot = this.task.snapshotChanges().pipe(
      
      finalize(() => {
       
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();
       
        this.UploadedFileURL.subscribe(resp=>{
          //Create an ID for document
          const id = this.database.createId();
          this.addImagetoDB({
            id_photo: id,
            name: file.name,
            filepath: resp,
            size: this.fileSize,
            uploadDate : new Date(),
            id_parent : albumName,
            nblike:0,
            nbcom:0
          },albumName,id);
          this.isUploading = false;
          console.log('5')
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

  addImagetoDB(image: MyData, albumName,createdId ) {

    // const id = this.database.createId();
    if(albumName === 'all'){
      //Set document id with value in database
      this.allImageCollection.doc(createdId).set(image).then(resp => {
        console.log(resp);
      }).catch(error => {
        console.log("error " + error);
      });
    }else{
      //Set document id with value in database
      this.filteredImageCollection.doc(createdId).set(image).then(resp => {
        console.log(resp);
      }).catch(error => {
        console.log("error " + error);
      });
    }
   
  }

  deletePicture(elt){
    return new Promise<any>((resolve, reject) => {

      const delete_photo = this.database.collection('ACA_Gallery', ref => ref.where('filepath', '==', elt.filepath));
      
      delete_photo.get().subscribe(delItems => {
        delItems.forEach(doc => {
          doc.ref.delete();
          this.storage.storage.refFromURL(elt.filepath).delete();
          resolve('ok');
        });
      });
    });

  }

  deleteAlbum(idalbum){
    return new Promise<any>((resolve, reject) => {
      const delete_album = this.database.collection('ACA_Gallery_Parents', ref => ref.where('id_parent', '==', idalbum));
    
      delete_album.get().subscribe(delItems => {
        delItems.forEach(doc => {
          doc.ref.delete();
          resolve('ok');
        });
      });
    });
  }
}
