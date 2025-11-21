import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsTs } from './levels.ts';

describe('LevelsTs', () => {
  let component: LevelsTs;
  let fixture: ComponentFixture<LevelsTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelsTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelsTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
