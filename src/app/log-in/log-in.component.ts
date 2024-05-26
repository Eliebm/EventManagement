import { Component, Inject, OnInit } from '@angular/core';
import { BaseService } from '../Service/baseService/base.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent implements OnInit {
  themeVal: any;
  storageKey: string = 'DarkMode';
  eyeType: string = 'fa-eye';
  typePassword: string = 'password';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    //this.baseService.setTheme();
    this.themeVal = localStorage.getItem(this.storageKey);
    const togglePassword = this.document.getElementById(
      'togglePasswordVisibility'
    );

    togglePassword?.addEventListener('click', () => {
      if (this.typePassword !== 'password') {
        this.typePassword = 'password';
        this.eyeType = 'fa fa-eye';
      } else {
        this.typePassword = 'text';
        this.eyeType = 'fa-eye-slash';
      }
    });
  }
}
