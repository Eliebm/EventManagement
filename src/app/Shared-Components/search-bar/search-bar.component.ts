import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() CallSearchFunction = new EventEmitter<string>();

  searchText!: string;

  Search(): void {
    this.CallSearchFunction.emit(this.searchText);
  }
}
