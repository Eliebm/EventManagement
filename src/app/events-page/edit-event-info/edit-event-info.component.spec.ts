import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventInfoComponent } from './edit-event-info.component';

describe('EditEventInfoComponent', () => {
  let component: EditEventInfoComponent;
  let fixture: ComponentFixture<EditEventInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEventInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
