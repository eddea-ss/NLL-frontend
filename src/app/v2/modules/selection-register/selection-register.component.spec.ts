import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionRegisterComponent } from './selection-register.component';

describe('SelectionRegisterComponent', () => {
  let component: SelectionRegisterComponent;
  let fixture: ComponentFixture<SelectionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
