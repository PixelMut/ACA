import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComListModalPage } from './com-list-modal.page';

describe('ComListModalPage', () => {
  let component: ComListModalPage;
  let fixture: ComponentFixture<ComListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComListModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
