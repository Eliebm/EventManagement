import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../Service/baseService/base.service';
import { EventGroup } from '../Models/eventGroup.Models';
import { EventGroupsService } from '../Service/event-groups.service';
import { Categories } from '../Models/staticData.Models';
import { User } from '../Models/user.Models';
import { AccountService } from '../Service/account.service';

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
  isUserLoggedIn: boolean = false;
  UserInfo!: User[];

  constructor(
    private router: Router,
    private baseService: BaseService,
    private eventGroupsService: EventGroupsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.baseService.setActiveRoute();

    let categories: Categories[] = [...Object.values(Categories)];
    this.categoryList = categories;
    this.isUserOnline();
    this.fetchAllGroups();
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  isUserOnline() {
    if (this.accountService.fetchSignedInUserInfo()?.length) {
      this.UserInfo = this.accountService.fetchSignedInUserInfo();
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
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
