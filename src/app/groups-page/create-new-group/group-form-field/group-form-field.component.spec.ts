import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormFieldComponent } from './group-form-field.component';

describe('GroupFormFieldComponent', () => {
  let component: GroupFormFieldComponent;
  let fixture: ComponentFixture<GroupFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupFormFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
