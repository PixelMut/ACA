import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifPublicationPage } from './modif-publication.page';

describe('ModifPublicationPage', () => {
  let component: ModifPublicationPage;
  let fixture: ComponentFixture<ModifPublicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifPublicationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifPublicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
