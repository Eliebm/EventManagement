import { Component, Input, OnInit } from '@angular/core';
import { User } from './Models/user.Models';
import { BaseClass } from './Models/baseClass.Models';
import { BaseService } from './Service/baseService/base.service';
import { AccountService } from './Service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private baseService: BaseService
  ) {}

  ngOnInit(): void {
    this.baseService.setTheme();
    this.accountService.setStaticData();
  }
}
