import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentCourseRegPage } from './student-course-reg.page';

describe('StudentCourseRegPage', () => {
  let component: StudentCourseRegPage;
  let fixture: ComponentFixture<StudentCourseRegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCourseRegPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCourseRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
