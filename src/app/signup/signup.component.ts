import { Component, OnInit } from '@angular/core';
import { locationList } from '../Models/staticData.Models';
import { User } from '../Models/user.Models';
import { AccountService } from '../Service/account.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  locationList: string[] = [];
  user!: User;

  firstName: string = '';
  LastName: string = '';
  email: string = '';
  location: string = '';
  Password: string = '';
  confPassword: string = '';
  showToastMessage: boolean = false;
  alertMessage!: string;
  toastType!: string;

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    let loadedLocation: locationList[] = [...Object.values(locationList)];

    this.locationList = loadedLocation;
  }

  checkInputsValidation(): void {
    if (
      this.firstName === '' ||
      this.LastName === '' ||
      this.location === '' ||
      this.email === '' ||
      this.Password === '' ||
      this.confPassword === ''
    ) {
      this.toastType = 'alert-error';
      this.showToastMessage = true;
      this.alertMessage =
        'One or more fields are empty. Please check your inputs.';
    } else {
      if (this.checkEmailValidation() === false) {
        this.toastType = 'alert-warning';
        this.showToastMessage = true;
        this.alertMessage = 'Invalid email format. Please try again.';
      } else if (this.Password !== this.confPassword) {
        this.toastType = 'alert-warning';
        this.showToastMessage = true;
        this.alertMessage = 'Password and Confirm Password do not match';
      } else {
        this.submitSignUp();
      }
    }
  }
  checkEmailValidation(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.email) && this.email.includes('.com')) {
      return true;
    } else {
      return false;
    }
  }
  removeValidationError(): void {
    this.showToastMessage = false;
  }
  submitSignUp(): void {
    this.user = {
      id: 1,
      firstName: this.firstName,
      lastName: this.LastName,
      email: this.email,
      password: this.Password,
      location: this.location,
    };

    if (this.accountService.generateUser(this.user) === true) {
      this.toastType = 'alert-success';
      this.showToastMessage = true;
      this.alertMessage = 'Registration for the account was successful.';
      this.clearInputs();
      setTimeout(() => {
        this.showToastMessage = false;
      }, 3000);
    } else {
      this.toastType = 'alert-error';
      this.showToastMessage = true;
      this.alertMessage = 'An email with that address already exists.';
    }
  }

  clearInputs(): void {
    this.firstName = '';
    this.LastName = '';
    this.email = '';
    this.Password = '';
    this.confPassword = '';
    this.location = '';
  }
}
