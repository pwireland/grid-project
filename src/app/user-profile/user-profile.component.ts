import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private userDetails;
  private newDetails = {
    currentPassword: '',
    newPassword: '',
    confirm: ''
  };

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.userDetails = this.auth.getUserDetails();
  }

  onSubmit(data, isValid: boolean) {
    console.log(this.newDetails);
  }

}
