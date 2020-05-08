// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { TestBed, async } from '@angular/core/testing';

// import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { AppComponent } from './app.component';
// import { RouterTestingModule } from '@angular/router/testing';

// class MockBackButton {
//   subscribeWithPriority: jasmine.Spy;
// }

// class MockPlatform {
//   ready: jasmine.Spy
//   backButton: any;
// }

// describe('AppComponent', () => {
//   let  mockBackButton,  mockPlatform
//   // let platformReadySpy,statusBarSpy
//   let splashScreenSpy, platformSpy;
//   const platformReadySpy = jasmine.createSpy().and.returnValue(Promise.resolve());
//   const platformStateSpy = jasmine.createSpyObj('PlatformStateService', {
//     isNativeMode: () => true
//   });

//   const statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
//   beforeEach(async(() => {
//     mockBackButton = new MockBackButton();
//     mockBackButton.subscribeWithPriority = jasmine.createSpy('subscribeWithPriority', (priority, fn) => {});
//     mockPlatform = new MockPlatform();
//     mockPlatform.backButton = mockBackButton;
//     mockPlatform.ready = platformReadySpy;

    
//     //statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
//     splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
//     //platformReadySpy = Promise.resolve();

//     platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
   
//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//       imports : [RouterTestingModule.withRoutes([])],
//       providers: [
//         { provide: StatusBar, useValue: statusBarSpy },
//         { provide: SplashScreen, useValue: splashScreenSpy },
      
//         { provide: Platform, useValue: mockPlatform },
        
//       ],
//     }).compileComponents();
//   }));
//   // { provide: Platform, useValue: platformSpy },
//   it('should create the app', async () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     // expect(mockPlatform.ready).toHaveBeenCalled();
//     // await platformReadySpy;
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   xit('should initialize the app', async () => {
//     TestBed.createComponent(AppComponent);
//     expect(mockPlatform.ready).toHaveBeenCalled();
//     await platformReadySpy;
    
//     expect(statusBarSpy.styleDefault).toHaveBeenCalled();
//     expect(splashScreenSpy.hide).toHaveBeenCalled();
//   });

//   // TODO: add more tests!

// });
import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AppComponent } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        IonicModule.forRoot(AppComponent)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof AppComponent).toBe(true);
  });

  it('should have two pages', () => {
    expect(component.pages.length).toBe(2);
  });

});