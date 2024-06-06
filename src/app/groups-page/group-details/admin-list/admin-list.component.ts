import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../Models/user.Models';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent implements OnInit {
  @Input() admins: User[] = [];

  ngOnInit(): void {}
}
