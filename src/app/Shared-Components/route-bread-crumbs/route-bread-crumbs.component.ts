import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';

@Component({
  selector: 'app-route-bread-crumbs',
  templateUrl: './route-bread-crumbs.component.html',
  styleUrl: './route-bread-crumbs.component.scss',
})
export class RouteBreadCrumbsComponent implements OnInit {
  activeRoute: any;

  constructor(private baseService: BaseService) {}
  ngOnInit(): void {
    this.baseService.setActiveRoute();
    let array = this.baseService.getRecentActiveRoute().split('/');

    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].replace(/"/g, '');
    }
    this.activeRoute = array.filter((x) => x !== '');
  }
}
