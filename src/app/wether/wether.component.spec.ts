import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WetherComponent } from './wether.component';

describe('WetherComponent', () => {
  let component: WetherComponent;
  let fixture: ComponentFixture<WetherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WetherComponent]
    });
    fixture = TestBed.createComponent(WetherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
