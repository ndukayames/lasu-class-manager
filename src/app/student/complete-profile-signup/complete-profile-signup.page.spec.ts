import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteProfileSignupPage } from './complete-profile-signup.page';

describe('CompleteProfileSignupPage', () => {
  let component: CompleteProfileSignupPage;
  let fixture: ComponentFixture<CompleteProfileSignupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteProfileSignupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteProfileSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
