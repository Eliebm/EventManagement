import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventAdministratorComponent } from './all-Event-administrator.component';

describe('AllEventAdministratorComponent', () => {
  let component: AllEventAdministratorComponent;
  let fixture: ComponentFixture<AllEventAdministratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllEventAdministratorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllEventAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
