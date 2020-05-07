import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: PhotoService = TestBed.get(PhotoService);
    expect(service).toBeTruthy();
  });
});
