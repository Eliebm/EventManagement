import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BaseService } from '../Service/baseService/base.service';
import { AccountService } from '../Service/account.service';
import { User } from '../Models/user.Models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  @Output() selectedTheme = new EventEmitter<string>();

  themeStorageKey: string = 'DarkMode';
  themeVal: any;
  user: User[] = [];
  isToggledTheme: any;
  isUserLoggedIn: boolean = false;
  avatarName: string = '';
  avatarCharName: string = '';

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

    this.setAvatarName();
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

  setAvatarName(): void {
    let data = localStorage.getItem('loggedInUser');
    if (data?.length) {
      this.user = JSON.parse(data);

      let fname = this.user[0].firstName;
      let lname = this.user[0].lastName;
      this.avatarName = fname + ' ' + lname;
      this.avatarCharName = fname.charAt(0).toUpperCase() + lname.charAt(0);
    }
  }
}
