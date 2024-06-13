import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdministratorComponent } from './all-administrator.component';

describe('AllAdministratorComponent', () => {
  let component: AllAdministratorComponent;
  let fixture: ComponentFixture<AllAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAdministratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
