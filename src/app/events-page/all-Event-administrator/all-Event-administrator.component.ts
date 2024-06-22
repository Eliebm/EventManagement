import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../Models/user.Models';
import { EventServicesService } from '../../Service/event-services.service';
import { DeleteMemberModalComponent } from '../../Shared-Components/delete-member-modal/delete-member-modal.component';

@Component({
  selector: 'app-all-Event-administrator',
  templateUrl: './all-Event-administrator.component.html',
  styleUrl: './all-Event-administrator.component.scss',
})
export class AllEventAdministratorComponent {
  retrievedMode: any;
  themeStorageKey: string = 'DarkMode';
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  eventId: any;
  isAdmin: string = 'true';
  admins!: User[];
  isUserLoggedIn: boolean = false;
  listTitle: string = 'Administrative Staff ';

  constructor(
    private route: ActivatedRoute,
    private baseService: BaseService,
    private router: Router,
    private EventService: EventServicesService,
    private dialog: MatDialog
  ) {
    this.route.queryParams.subscribe((params) => {
      this.eventId = params['param1'];
    });
  }

  ngOnInit(): void {
    this.fetchAllAdmins();
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

  fetchAllAdmins(): void {
    this.admins = this.EventService.fetchAllAdminsByEventId(this.eventId);
  }

  returnBack(): void {
    this.router.navigate(['/Events/' + this.eventId]);
  }

  deleteAdministrator(id: any): void {
    const dialogRef = this.dialog
      .open(DeleteMemberModalComponent, {
        data: {
          title: 'Administrator Removal Request',
          description: 'Are you sure about removing the Administrator?',
          buttonTitle: 'Delete',
        },
        position: { top: '50px' },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.data !== null) {
          let response = this.EventService.deleteAdministrator(
            this.eventId,
            id
          );
          if (response == true) {
            this.displayToastMessage(
              'alert-warning',
              'The Administrator has been deleted.'
            );
            this.closeToastMessage();

            this.fetchAllAdmins();
          } else {
            this.displayToastMessage(
              'alert-error',
              'the group can not be without any administrator '
            );
            this.closeToastMessage();
          }
        }
      });
  }
}
