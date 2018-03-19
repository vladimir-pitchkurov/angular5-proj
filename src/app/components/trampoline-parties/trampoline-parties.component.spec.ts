import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrampolinePartiesComponent } from './trampoline-parties.component';

describe('TrampolinePartiesComponent', () => {
  let component: TrampolinePartiesComponent;
  let fixture: ComponentFixture<TrampolinePartiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrampolinePartiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrampolinePartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
