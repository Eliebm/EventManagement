import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  @Output() selectedTheme = new EventEmitter<string>();

  StorageKey: string = 'DarkMode';
  themeVal: any;

  isToggledTheme: any;
  isUserLoggedIn: boolean = true;

  constructor(private titleservice: Title) {}

  ngOnInit(): void {
    let retrievedMode = localStorage.getItem(this.StorageKey);
    console.log(retrievedMode);
    if (retrievedMode === null) {
      retrievedMode = 'light';
    }
    if (retrievedMode === 'light') {
      this.isToggledTheme = true;
    } else {
      this.isToggledTheme = false;
    }
    this.themeVal = retrievedMode;
    console.log(this.themeVal);
  }

  changeTheme(value: boolean): void {
    if (value === true) {
      this.themeVal = 'light';
    } else {
      this.themeVal = 'dark';
    }
    localStorage.setItem(this.StorageKey, this.themeVal);
    this.selectedTheme.emit('true');
    this.isToggledTheme = !this.isToggledTheme;
  }
}
