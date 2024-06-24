import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../../Service/baseService/base.service';
import { EventGroupsService } from '../../Service/event-groups.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../Models/user.Models';
import { DeleteMemberModalComponent } from '../../Shared-Components/delete-member-modal/delete-member-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-administrator',
  templateUrl: './all-administrator.component.html',
  styleUrl: './all-administrator.component.scss',
})
export class AllAdministratorComponent implements OnInit, OnDestroy {
  retrievedMode: any;
  themeStorageKey: string = 'DarkMode';
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  groupId: any;
  isAdmin: string = 'true';
  admins!: User[];
  isUserLoggedIn: boolean = false;
  listTitle: string = 'Administrative Staff ';
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
    });
  }

  ngOnInit(): void {
    this.fetchAllAdmins();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.admins = this.groupService.fetchAllAdminsByGroupId(this.groupId);
  }

  returnBack(): void {
    this.router.navigate(['/Groups/' + this.groupId]);
  }

  deleteAdministrator(id: any): void {
    const dialogRef = this.dialog.open(DeleteMemberModalComponent, {
      data: {
        title: 'Administrator Removal Request',
        description: 'Are you sure about removing the Administrator?',
        buttonTitle: 'Delete',
      },
      position: { top: '50px' },
    });
    this.subscription = dialogRef.afterClosed().subscribe((res) => {
      if (res.data !== null) {
        let response = this.groupService.deleteAdministrator(this.groupId, id);
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
