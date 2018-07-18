import { Component, OnInit } from '@angular/core';
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
  }

  removeSupplier(nameString: String) {
    const obj = {name: nameString};
    this._dataService.removeSupplier(obj);
  }

  ngOnInit() {
    this._dataService.getSuppliers().subscribe(data => {
      this.suppliers = data;
      console.log(data);
    });
  }

}
