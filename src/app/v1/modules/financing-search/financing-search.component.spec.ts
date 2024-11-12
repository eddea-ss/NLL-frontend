import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingSearchComponent } from './financing-search.component';

describe('FinancingSearchComponent', () => {
  let component: FinancingSearchComponent;
  let fixture: ComponentFixture<FinancingSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancingSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
