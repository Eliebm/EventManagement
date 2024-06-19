import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountDownComponentComponent } from './count-down-component.component';

describe('CountDownComponentComponent', () => {
  let component: CountDownComponentComponent;
  let fixture: ComponentFixture<CountDownComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountDownComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountDownComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
