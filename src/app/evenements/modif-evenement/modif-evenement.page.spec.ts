import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifEvenementPage } from './modif-evenement.page';

describe('ModifEvenementPage', () => {
  let component: ModifEvenementPage;
  let fixture: ComponentFixture<ModifEvenementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifEvenementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifEvenementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
