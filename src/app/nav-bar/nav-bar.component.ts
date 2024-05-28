import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BaseService } from '../Service/baseService/base.service';
import { AccountService } from '../Service/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  @Output() selectedTheme = new EventEmitter<string>();

  themeStorageKey: string = 'DarkMode';
  themeVal: any;

  isToggledTheme: any;
  isUserLoggedIn: boolean = false;

  constructor(
    private titleService: Title,
    private baseService: BaseService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let retrievedMode = localStorage.getItem(this.themeStorageKey);

    if (retrievedMode === 'light') {
      this.isToggledTheme = true;
    } else {
      this.isToggledTheme = false;
    }
    this.themeVal = retrievedMode;

    if (localStorage.getItem('loggedInUser')?.length) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  changeTheme(value: boolean): void {
    if (value === true) {
      this.themeVal = 'light';
    } else {
      this.themeVal = 'dark';
    }
    localStorage.setItem(this.themeStorageKey, this.themeVal);
    this.selectedTheme.emit('true');
    this.isToggledTheme = !this.isToggledTheme;
  }

  login(): void {
    this.router.navigate(['/Login']);
  }

  userLogOut(): void {
    this.accountService.DeleteLoggedInUser();
    location.reload();
  }
}
