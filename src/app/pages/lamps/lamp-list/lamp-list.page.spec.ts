import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LampListPage } from './lamp-list.page';

describe('LampListPage', () => {
  let component: LampListPage;
  let fixture: ComponentFixture<LampListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LampListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LampListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
