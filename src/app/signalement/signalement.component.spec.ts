import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignalementComponent } from './signalement.component';

describe('SignalementComponent', () => {
  let component: SignalementComponent;
  let fixture: ComponentFixture<SignalementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignalementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
