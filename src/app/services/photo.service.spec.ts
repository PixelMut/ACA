import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/storage';

describe('PhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    providers : [ Camera, AngularFireStorage]
  }));

  xit('should be created', () => {
    const service: PhotoService = TestBed.get(PhotoService);
    expect(service).toBeTruthy();
  });
});
