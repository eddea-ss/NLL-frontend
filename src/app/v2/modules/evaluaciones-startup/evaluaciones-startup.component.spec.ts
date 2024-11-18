import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesStartupComponent } from './evaluaciones-startup.component';

describe('EvaluacionesStartupComponent', () => {
  let component: EvaluacionesStartupComponent;
  let fixture: ComponentFixture<EvaluacionesStartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionesStartupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionesStartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
