import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTimeLineComponent } from './event-time-line.component';

describe('EventTimeLineComponent', () => {
  let component: EventTimeLineComponent;
  let fixture: ComponentFixture<EventTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventTimeLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
