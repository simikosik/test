import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestDetail } from './quest-detail';

describe('QuestDetail', () => {
  let component: QuestDetail;
  let fixture: ComponentFixture<QuestDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
