import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrl: './rating-modal.component.scss',
})
export class RatingModalComponent {
  themeVal: any;
  checkedStars: any = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<RatingModalComponent>
  ) {}

  ngOnInit() {
    this.themeVal = localStorage.getItem('DarkMode');
    const stars = document.querySelectorAll('.rating input');

    // Add event listener to each star element
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        // Increment or decrement the counter based on the star's checked status
        if (star.ariaChecked) {
          this.checkedStars = index + 1; // Add 1 to convert from zero-based index to star count
        } else {
          this.checkedStars = index + 1; // If unchecked, decrease the counter
        }
      });
    });
  }

  submitRate(): void {
    this.dialogRef.close({ data: this.checkedStars });
  }
  closeModal(): void {
    this.dialogRef.close({ data: null });
  }
}
