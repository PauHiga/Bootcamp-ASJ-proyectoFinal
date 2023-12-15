import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSuppliersComponent } from './table-suppliers.component';

describe('TableSuppliersComponent', () => {
  let component: TableSuppliersComponent;
  let fixture: ComponentFixture<TableSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableSuppliersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
