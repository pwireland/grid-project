import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

export interface IAlert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  private users: Array<any>;
  private alerts: Array<IAlert> = [];
  public roles = ['Normal', 'Admin'];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  saveRole(user) {
    this._dataService.updateUserRole(user, (res, err) => {
      this.alerts.pop();
      if (err) {
        this.alerts.push({type: 'danger', message: err.error});
      } else {
        this.alerts.push({type: 'success', message: res});
      }
    });
  }

  closeAlert(alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
