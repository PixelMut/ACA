import { Injectable } from '@angular/core';

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
}
