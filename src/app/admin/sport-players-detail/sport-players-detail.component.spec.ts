import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPlayersDetailComponent } from './sport-players-detail.component';

describe('SportPlayersDetailComponent', () => {
  let component: SportPlayersDetailComponent;
  let fixture: ComponentFixture<SportPlayersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportPlayersDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportPlayersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
