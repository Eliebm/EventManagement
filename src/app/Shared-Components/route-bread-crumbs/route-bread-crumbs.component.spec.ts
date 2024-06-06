import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBreadCrumbsComponent } from './route-bread-crumbs.component';

describe('RouteBreadCrumbsComponent', () => {
  let component: RouteBreadCrumbsComponent;
  let fixture: ComponentFixture<RouteBreadCrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteBreadCrumbsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteBreadCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
