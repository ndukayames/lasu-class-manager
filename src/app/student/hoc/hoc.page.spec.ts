import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HocPage } from './hoc.page';

describe('HocPage', () => {
  let component: HocPage;
  let fixture: ComponentFixture<HocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
