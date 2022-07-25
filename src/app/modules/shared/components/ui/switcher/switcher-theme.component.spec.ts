import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherThemeComponent } from './switcher-theme.component';

describe('SwitcherComponent', () => {
  let component: SwitcherThemeComponent;
  let fixture: ComponentFixture<SwitcherThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwitcherThemeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitcherThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
