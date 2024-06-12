import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedMemberListComponent } from './extended-member-list.component';

describe('ExtendedMemberListComponent', () => {
  let component: ExtendedMemberListComponent;
  let fixture: ComponentFixture<ExtendedMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedMemberListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtendedMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
