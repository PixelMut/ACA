import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailPublicationPage } from './detail-publication.page';

describe('DetailPublicationPage', () => {
  let component: DetailPublicationPage;
  let fixture: ComponentFixture<DetailPublicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPublicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailPublicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
