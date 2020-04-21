import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecPopComponent } from './lec-pop.component';

describe('LecPopComponent', () => {
  let component: LecPopComponent;
  let fixture: ComponentFixture<LecPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecPopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
