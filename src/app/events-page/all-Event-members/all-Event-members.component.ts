import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user.Models';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';
import { EventGroupsService } from '../../Service/event-groups.service';
import { EventServicesService } from '../../Service/event-services.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMemberModalComponent } from '../../Shared-Components/delete-member-modal/delete-member-modal.component';

@Component({
  selector: 'app-all-Event-members',
  templateUrl: './all-Event-members.component.html',
  styleUrl: './all-Event-members.component.scss',
})
export class AllEventMembersComponent implements OnInit {
  retrievedMode: any;
  themeStorageKey: string = 'DarkMode';
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  eventId: any;
  isAdmin!: string;
  members!: User[];
  isUserLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router,
    private eventService: EventServicesService,
    private dialog: MatDialog
  ) {
    this.route.queryParams.subscribe((params) => {
      this.eventId = params['param1'];
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
    this.router.navigate(['/Events/' + this.eventId]);
  }

  fetchAllMembers(): void {
    this.members = this.eventService.fetchAllMembersByEventId(this.eventId);
  }

  deleteMember(id: any): void {
    const dialogRef = this.dialog
      .open(DeleteMemberModalComponent, {
        data: {
          title: 'Member Removal Request',
          description: 'Are you sure about removing the member?',
          buttonTitle: 'Delete',
        },
        position: { top: '50px' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.data !== null) {
          let response = this.eventService.deleteMember(this.eventId, id);
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
