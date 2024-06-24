import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss',
})
export class ChangePasswordModalComponent implements OnInit {
  themeVal: any;
  passwordInput!: string;
  passwordErrorMessage: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<ChangePasswordModalComponent>
  ) {}

  ngOnInit() {
    this.themeVal = localStorage.getItem('DarkMode');
  }
  confirm() {
    if (this.passwordInput === undefined) {
      this.passwordErrorMessage = false;
    } else {
      this.passwordErrorMessage = true;
      this.dialogRef.close({ data: this.passwordInput.toLowerCase() });
    }
  }
  closeModal(): void {
    this.dialogRef.close({ data: null });
  }
}
