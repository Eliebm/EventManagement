import { Component, HostBinding, OnInit, effect, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../Service/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  StorageKey: string = 'DarkMode';
  retrievedMode: any;

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit(): void {
    this.retrievedMode = localStorage.getItem(this.StorageKey);
  }

  addUser(): void {
    this.accountService.generateUser();
  }

  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.StorageKey);
  }
}
