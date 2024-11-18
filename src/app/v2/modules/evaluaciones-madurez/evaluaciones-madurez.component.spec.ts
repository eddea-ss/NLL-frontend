import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesMadurezComponent } from './evaluaciones-madurez.component';

describe('EvaluacionesMadurezComponent', () => {
  let component: EvaluacionesMadurezComponent;
  let fixture: ComponentFixture<EvaluacionesMadurezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionesMadurezComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionesMadurezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
