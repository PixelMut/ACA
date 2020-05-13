import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPhotoPage } from './view-photo.page';

describe('ViewPhotoPage', () => {
  let component: ViewPhotoPage;
  let fixture: ComponentFixture<ViewPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
