import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';
import { EventGroupsService } from '../../Service/event-groups.service';
import { EventGroup } from '../../Models/eventGroup.Models';
import { AdminListComponent } from './admin-list/admin-list.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss',
})
export class GroupDetailsComponent implements OnInit {
  themeStorageKey: string = 'DarkMode';
  StorageKey!: string;
  retrievedMode: any;
  groupId: any;
  groupInfos!: EventGroup[];

  constructor(
    private _eventGroupsService: EventGroupsService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.groupId = this._route.snapshot.paramMap.get('id');
    this.fetchGroupInfos();
    console.log(this.groupInfos);
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  fetchGroupInfos(): void {
    this.groupInfos = this._eventGroupsService.fetchEventGroupById(
      this.groupId
    );
  }
}
