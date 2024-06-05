import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categories } from '../../Models/staticData.Models';

@Component({
  selector: 'app-chip-button',
  templateUrl: './chip-button.component.html',
  styleUrl: './chip-button.component.scss',
})
export class ChipButtonComponent implements OnInit {
  @Input() categories: Categories[] = [];
  @Output() selectedCategory = new EventEmitter<string>();

  ngOnInit(): void {}

  sendSelection(data: any): any {
    this.selectedCategory.emit(data.value);
  }
}
