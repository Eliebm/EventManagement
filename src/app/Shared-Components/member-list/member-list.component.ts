import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '../../Models/user.Models';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnInit, OnChanges {
  @Input() members: User[] = [];
  @Output() ShowMore = new EventEmitter<any>();

  ShowMembers: User[] = [];
  listLength: any;

  ngOnInit(): void {
    this.fetchList();
  }

  ngOnChanges(changes: any) {
    this.fetchList();
  }

  fetchList(): void {
    this.ShowMembers = this.members.slice(0, 10);
    this.listLength = this.members.length - this.ShowMembers.length;
  }
  showMore(): void {
    this.ShowMore.emit();
  }
}
