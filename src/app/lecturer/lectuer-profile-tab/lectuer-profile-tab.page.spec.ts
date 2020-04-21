import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LectuerProfileTabPage } from './lectuer-profile-tab.page';

describe('LectuerProfileTabPage', () => {
  let component: LectuerProfileTabPage;
  let fixture: ComponentFixture<LectuerProfileTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectuerProfileTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LectuerProfileTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
