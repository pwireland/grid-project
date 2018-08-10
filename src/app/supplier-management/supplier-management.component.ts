import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from './../data.service';
import { IAlert } from '../ialert';

@Component({
  selector: 'app-supplier-management',
  templateUrl: './supplier-management.component.html',
  styleUrls: ['./supplier-management.component.scss']
})
export class SupplierManagementComponent implements OnInit {

  private suppliers: Array<any>;
  private alerts: Array<IAlert> = [];

  constructor(private _dataService: DataService) { }

  /**
   * Adds a new supplier to the database.
   * @param name Name of the supplier.
   */
  addSupplier(nameString: String) {
    const obj = {name: nameString};
    this._dataService.addSupplier(obj, (err, res) => {
      this.alerts.pop();
      if (err) {
        this.alerts.push({type: 'danger', message: err.error});
      } else {
        this.alerts.push({type: 'success', message: res});
        this._dataService.getSuppliers().subscribe(data => {
          this.suppliers = data;
        });
      }
    });
  }

  /**
   * Removes a supplier from the database.
   * @param nameString Name of the supplier.
   */
  removeSupplier(nameString: String) {
    const obj = {name: nameString};
    this._dataService.removeSupplier(obj, (err, res) => {
      this.alerts.pop();
      if (err) {
        this.alerts.push({type: 'danger', message: err.error});
      } else {
        this.alerts.push({type: 'success', message: res});
        this._dataService.getSuppliers().subscribe(data => {
          this.suppliers = data;
        });
      }
    });
  }

  ngOnInit() {
    this._dataService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  closeAlert(alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}
