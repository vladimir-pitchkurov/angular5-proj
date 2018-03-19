import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrampolinesHomepageComponent } from './trampolines-homepage.component';

describe('TrampolinesHomepageComponent', () => {
  let component: TrampolinesHomepageComponent;
  let fixture: ComponentFixture<TrampolinesHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrampolinesHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrampolinesHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
