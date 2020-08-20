import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LampsPage } from './lamps.page';

describe('LampsPage', () => {
  let component: LampsPage;
  let fixture: ComponentFixture<LampsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LampsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
