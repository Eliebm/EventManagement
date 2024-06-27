import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  output,
} from '@angular/core';
import { EventGroup } from '../../Models/eventGroup.Models';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrl: './user-groups.component.scss',
})
export class UserGroupsComponent implements OnInit, OnChanges {
  @Input() allGroups: EventGroup[] = [];
  @Output() searchGroups = new EventEmitter<any>();
  @Output() submitDeleteGroup = new EventEmitter<number>();

  filteredGroup!: EventGroup[];
  showedGroup!: EventGroup[];

  ngOnInit(): void {
    this.displayData();
  }
  ngOnChanges(): void {
    this.displayData();
  }

  displayData(): void {
    this.showedGroup = this.allGroups;
  }

  submitSearch(data: any): void {
    this.searchGroups.emit(data);
  }

  delete(grpId: number): void {
    this.submitDeleteGroup.emit(grpId);
  }
}
