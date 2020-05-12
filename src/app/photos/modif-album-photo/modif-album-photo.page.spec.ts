import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifAlbumPhotoPage } from './modif-album-photo.page';

describe('ModifAlbumPhotoPage', () => {
  let component: ModifAlbumPhotoPage;
  let fixture: ComponentFixture<ModifAlbumPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifAlbumPhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifAlbumPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
