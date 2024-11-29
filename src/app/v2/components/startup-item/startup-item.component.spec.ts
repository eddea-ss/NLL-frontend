import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupItemComponent } from './startup-item.component';

describe('StartupItemComponent', () => {
  let component: StartupItemComponent;
  let fixture: ComponentFixture<StartupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
