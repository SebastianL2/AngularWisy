import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forecast2Component } from './forecast.component';

describe('Forecast2Component', () => {
  let component: Forecast2Component;
  let fixture: ComponentFixture<Forecast2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forecast2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Forecast2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
