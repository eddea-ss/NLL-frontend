import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoPlataformaComponent } from './proyecto-plataforma.component';

describe('ProyectoPlataformaComponent', () => {
  let component: ProyectoPlataformaComponent;
  let fixture: ComponentFixture<ProyectoPlataformaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoPlataformaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectoPlataformaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
