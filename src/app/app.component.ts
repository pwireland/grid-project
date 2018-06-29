import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

   // Define a users property to hold our user data
  users: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    // Access the Data Service's getUsers() method
    this._dataService.getUsers()
        .subscribe(res => this.users = res);
  }

  private gridApi;

  title = 'Equipment DB app';

  columnDefs = [
    { headerName: 'Number', field: 'number', type: 'numericColumn', editable: true },
    { headerName: 'Model', field: 'model', editable: true },
    { headerName: 'Price', field: 'price', type: 'numericColumn', editable: true },
  ];

  rowData: any[];

  ngOnInit() {
    // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    this.rowData = [
      {number: 1, model: 'Model 1', price: 20},
      {number: 2, model: 'Model 2', price: 10},
      {number: 3, model: 'Model 3', price: 50},
      {number: 4, model: 'Model 4', price: 20},
      {number: 5, model: 'Model 6', price: 40}
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.number + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onAddRow() {
    const newItem = {
      number: '',
      model: '',
      price: ''
    };
    const res = this.gridApi.updateRowData({ add: [newItem] });
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    const res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res);
  }

}
