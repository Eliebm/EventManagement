import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../Service/baseService/base.service';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.scss',
})
export class GroupsPageComponent implements OnInit {
  themeStorageKey: string = 'DarkMode';
  StorageKey!: string;
  retrievedMode: any;
  activeRoute: any;

  constructor(private router: Router, private baseService: BaseService) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.baseService.setActiveRoute();
    let array = this.baseService.getRecentActiveRoute().split('/');

    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].replace(/"/g, '');
    }
    this.activeRoute = array.filter((x) => x !== '');
    console.log(this.activeRoute);
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }
}
