import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingItemComponent } from './financing-item.component';

describe('FinancingItemComponent', () => {
  let component: FinancingItemComponent;
  let fixture: ComponentFixture<FinancingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
