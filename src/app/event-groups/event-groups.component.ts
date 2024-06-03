import { Component, Input, OnInit } from '@angular/core';
import { EventGroup } from '../Models/eventGroup.Models';

@Component({
  selector: 'app-event-groups',
  templateUrl: './event-groups.component.html',
  styleUrl: './event-groups.component.scss',
})
export class EventGroupsComponent implements OnInit {
  @Input() groups: EventGroup[] = [];
  showedGroups: any;
  TotalEvent!: number;

  ngOnInit(): void {
    this.showedGroups = this.shuffleArray(this.groups).slice(0, 4);
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
