import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { User } from '../../../Models/user.Models';
import { AddAdminModalComponent } from '../add-admin-modal/add-admin-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent implements OnInit, OnChanges {
  @Input() admins: User[] = [];
  @Input() isAdministrator?: boolean;
  @Output() openAddModal = new EventEmitter<void>();
  @Output() ShowAdminsList = new EventEmitter<void>();

  ShowAdmins: User[] = [];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchList();
  }

  ngOnChanges(changes: any) {
    this.fetchList();
  }

  openAddAdministratorDialog(): void {
    this.openAddModal.emit();
  }
  showAdministratorsList(): void {
    this.ShowAdminsList.emit();
  }

  fetchList(): void {
    this.ShowAdmins = this.admins.slice(0, 2);
  }
}
