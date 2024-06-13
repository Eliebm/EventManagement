import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-member-modal',
  templateUrl: './delete-member-modal.component.html',
  styleUrl: './delete-member-modal.component.scss',
})
export class DeleteMemberModalComponent implements OnInit {
  title!: string;
  msg!: string;
  themeVal: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteMemberModalComponent>
  ) {}

  ngOnInit() {
    this.themeVal = localStorage.getItem('DarkMode');
  }

  confirm() {
    this.dialogRef.close({ data: 'true' });
  }

  closeModal(): void {
    this.dialogRef.close({ data: null });
  }
}
