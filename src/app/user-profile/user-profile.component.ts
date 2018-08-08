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
    username: '',
    currentPassword: '',
    newPassword: '',
    confirm: ''
  };

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.userDetails = this.auth.getUserDetails();
    this.newDetails.username = this.userDetails.username;
  }

  onSubmit() {
    console.log(this.newDetails);
    this.auth.changePassword(this.newDetails).subscribe(() => {
      console.log('Password change successful');
    }, (err) => {
      console.error(err);
    });
  }

}
