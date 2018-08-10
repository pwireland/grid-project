import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { IAlert } from '../ialert';

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

  @Input()
  public alerts: Array<IAlert> = [];

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.userDetails = this.auth.getUserDetails();
    this.newDetails.username = this.userDetails.username;
  }

  /**
   * Submits a password change request to the server. An alert is displayed depending on the
   * result of this request.
   */
  onSubmit() {
    this.alerts.pop();
    this.auth.changePassword(this.newDetails).subscribe(() => {
      this.alerts.push({type: 'success', message: 'Password successfully changed!'});
    }, (err) => {
      console.error(err);
      this.alerts.push({type: 'danger', message: err.error});
    });
  }

  closeAlert(alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}
