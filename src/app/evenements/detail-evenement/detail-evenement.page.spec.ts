import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailEvenementPage } from './detail-evenement.page';

describe('DetailEvenementPage', () => {
  let component: DetailEvenementPage;
  let fixture: ComponentFixture<DetailEvenementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEvenementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEvenementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
