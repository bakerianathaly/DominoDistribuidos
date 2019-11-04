import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPartidasComponent } from './total-partidas.component';

describe('TotalPartidasComponent', () => {
  let component: TotalPartidasComponent;
  let fixture: ComponentFixture<TotalPartidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPartidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
