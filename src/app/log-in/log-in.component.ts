import { Component, Inject, OnInit } from '@angular/core';
import { BaseService } from '../Service/baseService/base.service';
import { DOCUMENT } from '@angular/common';
import { AccountService } from '../Service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent implements OnInit {
  themeVal: any;
  themeStorageKey: string = 'DarkMode';
  eyeType: string = 'fa-eye';
  typePassword: string = 'password';
  emailInput: string = '';
  passwordInput: string = '';
  showEmailTooltip: any = '';
  hideEmailExclamation: boolean = true;
  hidePasswordExclamation: boolean = true;
  showPasswordTooltip: any = '';
  showToastMessage: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private baseService: BaseService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.baseService.setTheme();
    this.themeVal = localStorage.getItem(this.themeStorageKey);
    const togglePassword = this.document.getElementById(
      'togglePasswordVisibility'
    );

    togglePassword?.addEventListener('click', () => {
      if (this.typePassword !== 'password') {
        this.typePassword = 'password';
        this.eyeType = 'fa-eye';
      } else {
        this.typePassword = 'text';
        this.eyeType = 'fa-eye-slash';
      }
    });
  }

  checkValidation(): void {
    if (this.emailInput === '' && this.passwordInput === '') {
      this.showEmailTooltip = 'tooltip-open';
      this.hideEmailExclamation = false;
      this.showPasswordTooltip = 'tooltip-open';
      this.hidePasswordExclamation = false;
    } else if (this.emailInput === '') {
      this.showEmailTooltip = 'tooltip-open';
      this.hideEmailExclamation = false;
    } else if (this.passwordInput === '') {
      this.showPasswordTooltip = 'tooltip-open';
      this.hidePasswordExclamation = false;
    } else {
      this.submitLogin();
    }
  }
  submitLogin(): void {
    let valid;
    valid = this.accountService.loginUser(this.emailInput, this.passwordInput);
    if (valid === false) {
      this.showToastMessage = true;
    } else {
      let RecentActiveRoute = JSON.parse(
        this.baseService.getRecentActiveRoute()
      );

      this.router.navigate([RecentActiveRoute]);
    }
  }
  removePasswordWarning(): void {
    if (this.passwordInput === '') {
      this.showPasswordTooltip = '';
      this.hidePasswordExclamation = true;
    } else {
      this.showToastMessage = false;
    }
  }
  removeEmailWarning(): void {
    this.showEmailTooltip = ' ';
    this.hideEmailExclamation = true;
    this.showToastMessage = false;
  }
}
