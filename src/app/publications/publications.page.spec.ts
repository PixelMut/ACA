import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PublicationsPage } from './publications.page';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('PublicationsPage', () => {
  let component: PublicationsPage;
  let fixture: ComponentFixture<PublicationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule,RouterModule,RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
