import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LampDetailPage } from './lamp-detail.page';

describe('LampDetailPage', () => {
  let component: LampDetailPage;
  let fixture: ComponentFixture<LampDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LampDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
