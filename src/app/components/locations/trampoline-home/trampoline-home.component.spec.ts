import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrampolineHomeComponent } from './trampoline-home.component';

describe('TrampolineHomeComponent', () => {
  let component: TrampolineHomeComponent;
  let fixture: ComponentFixture<TrampolineHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrampolineHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrampolineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
