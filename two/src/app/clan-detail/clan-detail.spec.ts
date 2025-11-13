import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanDetail } from './clan-detail';

describe('ClanDetail', () => {
  let component: ClanDetail;
  let fixture: ComponentFixture<ClanDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClanDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
