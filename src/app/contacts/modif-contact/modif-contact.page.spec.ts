import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifContactPage } from './modif-contact.page';

describe('ModifContactPage', () => {
  let component: ModifContactPage;
  let fixture: ComponentFixture<ModifContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
