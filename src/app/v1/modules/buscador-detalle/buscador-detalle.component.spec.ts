import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorDetalleComponent } from './buscador-detalle.component';

describe('BuscadorDetalleComponent', () => {
  let component: BuscadorDetalleComponent;
  let fixture: ComponentFixture<BuscadorDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
