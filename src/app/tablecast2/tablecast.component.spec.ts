import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecastComponent } from './tablecast.component';

describe('TablecastComponent', () => {
  let component: TablecastComponent;
  let fixture: ComponentFixture<TablecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablecastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
