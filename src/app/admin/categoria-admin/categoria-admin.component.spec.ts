import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAdminComponent } from './categoria-admin.component';

describe('CategoriaAdminComponent', () => {
  let component: CategoriaAdminComponent;
  let fixture: ComponentFixture<CategoriaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
