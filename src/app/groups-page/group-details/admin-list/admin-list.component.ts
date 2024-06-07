import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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

  ShowedAdmins: User[] = [];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchList();
  }

  ngOnChanges(changes: any) {
    this.ShowedAdmins = this.admins;
  }

  openAddDeviceDialog(): void {
    this.openAddModal.emit();
  }

  fetchList(): void {
    this.ShowedAdmins = this.admins;
  }
}
