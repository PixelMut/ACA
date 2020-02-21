import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailContactPage } from './detail-contact.page';

describe('DetailContactPage', () => {
  let component: DetailContactPage;
  let fixture: ComponentFixture<DetailContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
