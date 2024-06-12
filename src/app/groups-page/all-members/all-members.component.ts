import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';
import { User } from '../../Models/user.Models';
import { EventGroupsService } from '../../Service/event-groups.service';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrl: './all-members.component.scss',
})
export class AllMembersComponent implements OnInit {
  retrievedMode: any;
  themeStorageKey: string = 'DarkMode';
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  groupId: any;
  isAdmin!: string;
  members!: User[];
  isUserLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router,
    private groupService: EventGroupsService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.groupId = params['param1'];
      this.isAdmin = params['param2'];
    });
  }

  ngOnInit(): void {
    this.baseService.setActiveRoute();
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
    this.fetchAllMembers();
    this.isUserOnline();
  }

  isUserOnline() {
    let data = localStorage.getItem('loggedInUser');
    if (data?.length) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
      this.returnBack();
    }
  }
  SelectedTheme(data: any) {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  displayToastMessage(type: string, msg: string): void {
    this.showToastMessage = true;
    this.toastType = type;
    this.toastMessage = msg;
  }

  closeToastMessage(): void {
    setTimeout(() => {
      this.showToastMessage = false;
    }, 3000);
  }

  returnBack(): void {
    this.router.navigate(['/Groups/' + this.groupId]);
  }

  fetchAllMembers(): void {
    this.members = this.groupService.fetchAllMembersByGroupId(this.groupId);
  }

  deleteMember(id: any): void {
    let response = this.groupService.deleteMember(this.groupId, id);
    this.fetchAllMembers();
  }
}
