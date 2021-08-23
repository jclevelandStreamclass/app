import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPlayersComponent } from './sport-players.component';

describe('SportPlayersComponent', () => {
  let component: SportPlayersComponent;
  let fixture: ComponentFixture<SportPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
