import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../Models/user.Models';

@Component({
  selector: 'app-extended-member-list',
  templateUrl: './extended-member-list.component.html',
  styleUrl: './extended-member-list.component.scss',
})
export class ExtendedMemberListComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() isAdmin!: string;
  @Input() memberList!: User[];
  @Input() title: string = 'Members';
  @Output() deleteMember = new EventEmitter<number>();

  dataSource!: MatTableDataSource<any>;
  pageSize: number = 5;
  displayedColumns: string[] = ['name', 'email', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.memberList) {
      this.dataSource.paginator = this.paginator;
    } else {
    }
  }

  ngOnInit(): void {
    this.showList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showList();
  }

  showList(): void {
    this.dataSource = new MatTableDataSource<any>(this.memberList);
  }
  delete(id: number): void {
    this.deleteMember.emit(id);
  }
}
