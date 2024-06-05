import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipButtonComponent } from './chip-button.component';

describe('ChipButtonComponent', () => {
  let component: ChipButtonComponent;
  let fixture: ComponentFixture<ChipButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChipButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
