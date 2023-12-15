import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersDisplayComponent } from './suppliers-display.component';

describe('SuppliersDisplayComponent', () => {
  let component: SuppliersDisplayComponent;
  let fixture: ComponentFixture<SuppliersDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppliersDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
