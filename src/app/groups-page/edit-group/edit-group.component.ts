import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventGroupsService } from '../../Service/event-groups.service';
import { EventGroup } from '../../Models/eventGroup.Models';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.scss',
})
export class EditGroupComponent implements OnInit {
  retrievedMode: any;
  themeStorageKey: string = 'DarkMode';
  showToastMessage: boolean = false;
  toastMessage!: string;
  toastType!: string;
  groupId: any;
  isAdmin: string = 'true';
  groupInfo!: EventGroup[];

  isUserLoggedIn: boolean = false;
  listTitle: string = 'Administrative Staff ';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: EventGroupsService
  ) {
    this.groupId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.SelectedTheme();
    this.fetchGroupInfo();
  }

  SelectedTheme() {
    this.retrievedMode = localStorage.getItem(this.themeStorageKey);
  }

  returnBack(): void {
    this.router.navigate(['/Groups/' + this.groupId]);
  }

  fetchGroupInfo(): void {
    this.groupInfo = this.groupService.fetchEventGroupById(this.groupId);
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

  checkFormValidation(data: any): void {
    if (
      data.title == '' ||
      data.description == '' ||
      data.SelectedCategory == 'undefined' ||
      data.SelectedImage == 'undefined'
    ) {
      this.displayToastMessage(
        'alert-error',
        'One or more fields are empty. Please check your inputs.'
      );
      this.closeToastMessage();
    } else {
      this.submitForm(data);
    }
  }

  submitForm(data: any): void {
    let response = this.groupService.editGroupInfoByGroupId(this.groupId, data);
    if (response == true) {
      this.displayToastMessage(
        'alert-success',
        'The group has been successfully Edited.'
      );
      setTimeout(() => {
        this.router.navigate(['/Groups/' + this.groupId]);
      }, 2000);
    } else {
      this.displayToastMessage('alert-error', 'Unable to edit the group');
    }
    this.closeToastMessage();
  }
}
