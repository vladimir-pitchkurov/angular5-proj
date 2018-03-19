import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinourteamComponent } from './joinourteam.component';

describe('JoinourteamComponent', () => {
  let component: JoinourteamComponent;
  let fixture: ComponentFixture<JoinourteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinourteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinourteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
