import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DepartmentsInThisClassPage } from './departments-in-this-class.page';

describe('DepartmentsInThisClassPage', () => {
  let component: DepartmentsInThisClassPage;
  let fixture: ComponentFixture<DepartmentsInThisClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsInThisClassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartmentsInThisClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
