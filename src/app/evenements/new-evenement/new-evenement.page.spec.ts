import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewEvenementPage } from './new-evenement.page';

describe('NewEvenementPage', () => {
  let component: NewEvenementPage;
  let fixture: ComponentFixture<NewEvenementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEvenementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewEvenementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
