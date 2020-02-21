import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvenementsPage } from './evenements.page';

describe('EvenementsPage', () => {
  let component: EvenementsPage;
  let fixture: ComponentFixture<EvenementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvenementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
