import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewPublicationPage } from './new-publication.page';

describe('NewPublicationPage', () => {
  let component: NewPublicationPage;
  let fixture: ComponentFixture<NewPublicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPublicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPublicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
