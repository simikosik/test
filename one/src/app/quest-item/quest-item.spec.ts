import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestItem } from './quest-item';

describe('QuestItem', () => {
  let component: QuestItem;
  let fixture: ComponentFixture<QuestItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
