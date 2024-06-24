import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';
import { User } from '../../Models/user.Models';
import { EventGroupsService } from '../../Service/event-groups.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMemberModalComponent } from '../../Shared-Components/delete-member-modal/delete-member-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrl: './all-members.component.scss',
})
export class AllMembersComponent implements OnInit, OnDestroy {
  retrievedMode: any;
  themeStorageKey: string = 'DarkMode';
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  groupId: any;
  isAdmin!: string;
  members!: User[];
  isUserLoggedIn: boolean = false;
  private subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router,
    private groupService: EventGroupsService,
    private dialog: MatDialog
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    const dialogRef = this.dialog.open(DeleteMemberModalComponent, {
      data: {
        title: 'Member Removal Request',
        description: 'Are you sure about removing the member?',
        buttonTitle: 'Delete',
      },
      position: { top: '50px' },
    });
    this.subscription = dialogRef.afterClosed().subscribe((res) => {
      if (res.data !== null) {
        let response = this.groupService.deleteMember(this.groupId, id);
        if (response == true) {
          this.displayToastMessage(
            'alert-warning',
            'The member has been deleted.'
          );
          this.closeToastMessage();

          this.fetchAllMembers();
        }
      }
    });
  }
}
