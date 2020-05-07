import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';

describe('FirestoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers : [AngularFirestoreModule]
  }));

  xit('Firestore data service should be created', () => {
    const service: FirestoreService = TestBed.get(FirestoreService);
    expect(service).toBeTruthy();
  });
});

