import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocketPage } from './socket.page';

describe('SocketPage', () => {
  let component: SocketPage;
  let fixture: ComponentFixture<SocketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
