import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrl: './add-admin-modal.component.scss',
})
export class AddAdminModalComponent implements OnInit {
  themeVal: any;
  emailInput!: string;
  emailErrorMessage: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<AddAdminModalComponent>
  ) {}

  ngOnInit() {
    this.themeVal = localStorage.getItem('DarkMode');
  }

  checkEmailValidation(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.emailInput) && this.emailInput.includes('.com')) {
      return true;
    } else {
      return false;
    }
  }
  confirm() {
    if (!this.checkEmailValidation()) {
      this.emailErrorMessage = false;
    } else {
      this.emailErrorMessage = true;
      this.dialogRef.close({ data: this.emailInput.toLowerCase() });
    }
  }
  closeModal(): void {
    this.dialogRef.close({ data: null });
  }
}
