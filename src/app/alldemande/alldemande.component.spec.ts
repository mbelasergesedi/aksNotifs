import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlldemandeComponent } from './alldemande.component';

describe('AlldemandeComponent', () => {
  let component: AlldemandeComponent;
  let fixture: ComponentFixture<AlldemandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldemandeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlldemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
