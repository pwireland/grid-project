import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-supplier-management',
  templateUrl: './supplier-management.component.html',
  styleUrls: ['./supplier-management.component.scss']
})
export class SupplierManagementComponent implements OnInit {

  private suppliers: Array<any>;

  constructor(private _dataService: DataService) { }

  /**
   * Adds a new supplier to the database.
   * @param name Name of the supplier.
   */
  addSupplier(nameString: String) {
    const obj = {name: nameString};
    this._dataService.addSupplier(obj);
    this._dataService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  /**
   * Removes a supplier from the database.
   * @param nameString Name of the supplier.
   */
  removeSupplier(nameString: String) {
    const obj = {name: nameString};
    this._dataService.removeSupplier(obj);
    this._dataService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

  ngOnInit() {
    this._dataService.getSuppliers().subscribe(data => {
      this.suppliers = data;
    });
  }

}
