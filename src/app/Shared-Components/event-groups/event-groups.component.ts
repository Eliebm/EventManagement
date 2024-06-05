import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EventGroup } from '../../Models/eventGroup.Models';
import { BaseService } from '../../Service/baseService/base.service';

@Component({
  selector: 'app-event-groups',
  templateUrl: './event-groups.component.html',
  styleUrl: './event-groups.component.scss',
})
export class EventGroupsComponent implements OnInit, OnChanges {
  @Input() groupsData: EventGroup[] = [];
  showedGroups: any;
  TotalEvent!: number;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.displayGroupsByRoute();
  }

  ngOnChanges(changes: any) {
    this.displayGroupsByRoute();
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  displayGroupsByRoute(): void {
    let active_route;
    active_route = this.baseService.getRecentActiveRoute();

    if (active_route.includes('Home')) {
      this.showedGroups = this.shuffleArray(this.groupsData).slice(0, 4);
    } else {
      this.showedGroups = this.shuffleArray(this.groupsData);
    }
  }
}
