import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrampolineParkComponent } from './trampoline-park.component';

describe('TrampolineParkComponent', () => {
  let component: TrampolineParkComponent;
  let fixture: ComponentFixture<TrampolineParkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrampolineParkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrampolineParkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
