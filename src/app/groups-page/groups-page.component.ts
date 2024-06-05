import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../Service/baseService/base.service';
import { EventGroup } from '../Models/eventGroup.Models';
import { EventGroupsService } from '../Service/event-groups.service';
import { Categories } from '../Models/staticData.Models';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrl: './groups-page.component.scss',
})
export class GroupsPageComponent implements OnInit {
  themeStorageKey: string = 'DarkMode';
  StorageKey!: string;
  retrievedMode: any;
  allGroups: EventGroup[] = [];
  categoryList!: Categories[];
  showedAllGroups: EventGroup[] = [];

  constructor(
    private router: Router,
    private baseService: BaseService,
    private eventGroupsService: EventGroupsService
  ) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.baseService.setActiveRoute();

    let categories: Categories[] = [...Object.values(Categories)];
    this.categoryList = categories;
    this.fetchAllGroups();
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  sortByCategory(data: any): void {
    this.showedAllGroups = this.performFilter(data);
  }

  performFilter(filterBy: string): EventGroup[] {
    filterBy = filterBy.toLocaleLowerCase();
    if (filterBy === 'all') {
      return this.allGroups.filter(
        (x: EventGroup) => !x.category.toLocaleLowerCase().includes('all')
      );
    } else {
      return this.allGroups.filter((x: EventGroup) =>
        x.category.toLocaleLowerCase().includes(filterBy)
      );
    }
  }

  fetchAllGroups(): void {
    this.showedAllGroups = this.eventGroupsService.getEventGroups();
    this.allGroups = this.eventGroupsService.getEventGroups();
  }
}
