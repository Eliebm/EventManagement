import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestRequestComponent } from './rest-request.component';

describe('RestRequestComponent', () => {
  let component: RestRequestComponent;
  let fixture: ComponentFixture<RestRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
