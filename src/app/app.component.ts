import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

  private columnDefs;
  private defaultColDef;
  // Define a users property to hold our user data
  users: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    this.columnDefs = [
      { headerName: 'Wafer no.', field: 'wafer_n', type: 'numericColumn', cellClass: 'cell-wafer-n' },
      { headerName: 'LED No.', field: 'led_n', cellClass: 'cell-led-n' },
      { headerName: 'Date', field: 'date', type: 'numericColumn' },
      { headerName: 'Supplier', field: 'supplier', cellClass: 'cell-supplier' },
      { headerName: 'Supplier PIN or Type', field: 'supplier_pin' },
      { headerName: 'Scan or enter Lot/Batch No.', field: 'lot_n', cellClass: 'cell-lot-n' },
      { headerName: 'Bin. Grade or Kit Number', field: 'bin_n', cellClass: 'cell-bin-n' },
      { headerName: 'Qty on Wafer', field: 'qty_wafer', type: 'numericColumn' },
      { headerName: 'Manufacturing date', field: 'manufacturing_date', type: 'numericColumn' },
      { headerName: 'Test Current', field: 'test_current', type: 'numericColumn' },
      { headerName: 'Min', field: 'min', type: 'numericColumn' },
      { headerName: 'Ave.', field: 'average', type: 'numericColumn' },
      { headerName: 'Max.', field: 'max', type: 'numericColumn' },
      { headerName: 'Units', field: 'units' }
    ];

    // Default column options
    this.defaultColDef = {
      editable: true,
      width: 96
    };

    // Access the Data Service's getUsers() method
    this._dataService.getUsers()
      .subscribe(res => this.users = res);
  }

  private gridApi;
  private gridColumnApi;

  title = 'Equipment DB app';

  private rowData: any[];

  ngOnInit() {
    this.rowData = [
      {
        wafer_n: 4436, led_n: 'LED0020', date: '07/02/2018', supplier: 'EPIGAP', supplier_pin: 'ELOC-870-11',
        lot_n: '2626H/003/6', bin_n: '', qty_wafer: 1412, manufacturing_date: '######', test_current: '20mA',
        min: 1.31, average: 1.33, max: 1.33, units: 'V'
      },
      {
        wafer_n: 4437, led_n: 'LED0020', date: '07/02/2018', supplier: 'EPIGAP', supplier_pin: 'ELOC-870-11',
        lot_n: '2626H/0037a', bin_n: '', qty_wafer: 210, manufacturing_date: '######', test_current: '20mA',
        min: 1.33, average: 1.33, max: 1.34, units: 'V'
      },
      {
        wafer_n: 4438, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800900', bin_n: 'H15', qty_wafer: 927, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 4439, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '227KY800901', bin_n: 'H15', qty_wafer: 937, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.13, max: 2.40, units: ''
      },
      {
        wafer_n: 4440, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800902', bin_n: 'H15', qty_wafer: 876, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
      {
        wafer_n: 0, led_n: '', date: 0, supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
        manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
      },
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // Automatically resize columns
    this.autoSizeAll();
    this.gridApi.setHeaderHeight(50);
  }

  // Automatically resize columns
  autoSizeAll() {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.wafer_n).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  onAddRow() {
    const newItem = {
      wafer_n: 0, led_n: '', date: '', supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
      manufacturing_date: '', test_current: '', min: 0, average: 0, max: 0, units: ''
    };
    const res = this.gridApi.updateRowData({ add: [newItem] });
  }

  onRemoveSelected() {
    const selectedData = this.gridApi.getSelectedRows();
    const res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res);
  }

}
