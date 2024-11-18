import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoEquipoComponent } from './proyecto-equipo.component';

describe('ProyectoEquipoComponent', () => {
  let component: ProyectoEquipoComponent;
  let fixture: ComponentFixture<ProyectoEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoEquipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
