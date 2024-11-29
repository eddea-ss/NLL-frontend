import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierItemComponent } from './supplier-item.component';

describe('SupplierItemComponent', () => {
  let component: SupplierItemComponent;
  let fixture: ComponentFixture<SupplierItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplierItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
