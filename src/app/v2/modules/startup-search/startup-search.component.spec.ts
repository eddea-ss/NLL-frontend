import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupSearchComponent } from './startup-search.component';

describe('StartupSearchComponent', () => {
  let component: StartupSearchComponent;
  let fixture: ComponentFixture<StartupSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
