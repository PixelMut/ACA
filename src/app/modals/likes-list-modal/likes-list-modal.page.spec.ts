import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikesListModalPage } from './likes-list-modal.page';

describe('LikesListModalPage', () => {
  let component: LikesListModalPage;
  let fixture: ComponentFixture<LikesListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesListModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikesListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
