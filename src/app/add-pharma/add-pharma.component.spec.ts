import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPharmaComponent } from './add-pharma.component';

describe('AddPharmaComponent', () => {
  let component: AddPharmaComponent;
  let fixture: ComponentFixture<AddPharmaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPharmaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
