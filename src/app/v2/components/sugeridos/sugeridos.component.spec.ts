import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugeridosComponent } from './sugeridos.component';

describe('SugeridosComponent', () => {
  let component: SugeridosComponent;
  let fixture: ComponentFixture<SugeridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SugeridosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SugeridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
