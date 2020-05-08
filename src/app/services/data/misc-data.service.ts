import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiscDataService {

// Localisations
	public list_localisations = [
		{id: 1, name: 'Acensi Belgium' },
		{id: 2, name: 'Acensi France' }
	];

	
  constructor() { }

  private fooSubject = new Subject<any>();

  publishSomeData(data: any) {
	  this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
	  return this.fooSubject;
  }

}
