import { Component, OnInit } from '@angular/core';
import { User } from './Models/user.Models';
import { BaseClass } from './Models/baseClass.Models';
import { BaseService } from './Service/baseService/base.service';
import { AccountService } from './Service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.setStaticData();
  }

  addUser(): void {
    this.accountService.generateUser();
  }
}
