import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesProveedorComponent } from './evaluaciones-proveedor.component';

describe('EvaluacionesProveedorComponent', () => {
  let component: EvaluacionesProveedorComponent;
  let fixture: ComponentFixture<EvaluacionesProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionesProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionesProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
