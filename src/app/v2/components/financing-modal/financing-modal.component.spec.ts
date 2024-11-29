import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingModalComponent } from './financing-modal.component';

describe('FinancingModalComponent', () => {
  let component: FinancingModalComponent;
  let fixture: ComponentFixture<FinancingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
