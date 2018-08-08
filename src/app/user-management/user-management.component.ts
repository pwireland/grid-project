import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  private users: Array<any>;
  public roles = ['Normal', 'Admin'];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  saveRole(user) {
    this._dataService.updateUserRole(user);
  }

}
