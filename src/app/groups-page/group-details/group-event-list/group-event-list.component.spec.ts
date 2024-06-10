import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEventListComponent } from './group-event-list.component';

describe('GroupEventListComponent', () => {
  let component: GroupEventListComponent;
  let fixture: ComponentFixture<GroupEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupEventListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
