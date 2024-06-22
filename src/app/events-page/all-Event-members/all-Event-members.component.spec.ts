import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventMembersComponent } from './all-Event-members.component';

describe('AllEventMembersComponent', () => {
  let component: AllEventMembersComponent;
  let fixture: ComponentFixture<AllEventMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllEventMembersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllEventMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
