import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { DataService } from './data.service';

// Used for Jquery datepicker
declare var $: any;

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
  private components;
  // Define a users property to hold our user data
  users: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    this.columnDefs = [
      {
        headerName: 'PROPHOTONIX DATA',
        headerClass: 'gHeader1',
        children: [
          { headerName: 'Wafer no.', field: 'wafer_n', type: 'numericColumn',
            cellClass: 'cell-wafer-n', headerClass: 'headerMain', filter: 'agNumberColumnFilter' },
          { headerName: 'LED No.', field: 'led_n', cellClass: 'cell-led-n' },
          { headerName: 'Date', field: 'date', type: 'numericColumn',
            headerClass: 'headerMain', cellEditor: 'datePicker' }
        ]
      },
      {
        headerName: 'SUPPLIER DATA',
        headerClass: 'gHeader2',
        children: [
          { headerName: 'Supplier', field: 'supplier', cellClass: 'cell-supplier' },
          { headerName: 'Supplier PIN or Type', field: 'supplier_pin' },
          { headerName: 'Scan or enter Lot/Batch No.', field: 'lot_n', cellClass: 'cell-lot-n' },
          { headerName: 'Bin. Grade or Kit Number', field: 'bin_n', cellClass: 'cell-bin-n' },
          { headerName: 'Qty on Wafer', field: 'qty_wafer', type: 'numericColumn',
            headerClass: 'headerMain', filter: 'agNumberColumnFilter' },
          { headerName: 'Manufacturing date', field: 'manufacturing_date', type: 'numericColumn',
            headerClass: 'headerMain' },
          { headerName: 'Test Current', field: 'test_current', type: 'numericColumn',
            headerClass: 'headerMain' }
        ]
      },
      {
        headerName: 'FORWARD VOLTAGE (VF/VF2)',
        headerClass: 'gHeader3',
        children: [
          { headerName: 'Min', field: 'min', type: 'numericColumn',
            headerClass: 'headerMain', filter: 'agNumberColumnFilter' },
          { headerName: 'Ave.', field: 'average', type: 'numericColumn',
            headerClass: 'headerMain', filter: 'agNumberColumnFilter' },
          { headerName: 'Max.', field: 'max', type: 'numericColumn',
            headerClass: 'headerMain', filter: 'agNumberColumnFilter' },
          { headerName: 'Units', field: 'units' }
        ]
      }
    ];
    this.components = { datePicker: getDatePicker() };

    // Default column options
    this.defaultColDef = {
      editable: true,
      headerClass: 'headerMain'
    };

    // Access the Data Service's getUsers() method
    this._dataService.getUsers()
      .subscribe(res => this.users = res);
  }

  private gridApi;
  private gridColumnApi;

  title = 'Grid Project app';

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
      // 4441 //
      {
        wafer_n: 4441, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22L0400909', bin_n: 'H15', qty_wafer: 920, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 4442, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '227L0400911', bin_n: 'H15', qty_wafer: 977, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.15, max: 2.40, units: ''
      },
      {
        wafer_n: 4443, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800912', bin_n: 'H15', qty_wafer: 893, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 4444, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800914', bin_n: 'H15', qty_wafer: 960, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 4445, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800915', bin_n: 'H15', qty_wafer: 974, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 4446, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800916', bin_n: 'H15', qty_wafer: 886, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 4447, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800917', bin_n: 'H15', qty_wafer: 971, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 4448, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800918', bin_n: 'H15', qty_wafer: 974, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.14, max: 2.40, units: ''
      },
      {
        wafer_n: 4449, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800919', bin_n: 'H15', qty_wafer: 973, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.15, max: 2.40, units: ''
      },
      {
        wafer_n: 4450, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '22KY800920', bin_n: 'H15', qty_wafer: 715, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.11, max: 2.40, units: ''
      },
      {
        wafer_n: 4451, led_n: 'LED0034', date: '08/02/2018', supplier: 'EPISTAR', supplier_pin: 'ES-SMHRPN42B',
        lot_n: '4180039000', bin_n: 'H15', qty_wafer: 124, manufacturing_date: '', test_current: '',
        min: 2.00, average: 2.11, max: 2.40, units: ''
      },
      // COMMENT 4452 //
      {
        wafer_n: 4452, led_n: 'LED0052', date: '08/02/2018', supplier: 'MARUBENI', supplier_pin: 'C1300.30',
        lot_n: '17F06-705A', bin_n: '', qty_wafer: 2420, manufacturing_date: '', test_current: '',
        min: '', average: '', max: '', units: ''
      },
      {
        wafer_n: 4453, led_n: 'LED0052', date: '08/02/2018', supplier: 'MARUBENI', supplier_pin: 'C1300.30',
        lot_n: '17J25-706E', bin_n: '', qty_wafer: 2593, manufacturing_date: '', test_current: '',
        min: '', average: '', max: '', units: ''
      },
      {
        wafer_n: 4454, led_n: 'LED0052', date: '08/02/2018', supplier: 'MARUBENI', supplier_pin: 'C1300.30',
        lot_n: '17F06-705A', bin_n: '', qty_wafer: 4162, manufacturing_date: '', test_current: '',
        min: '', average: '', max: '', units: ''
      },
      {
        wafer_n: 4455, led_n: 'LED0052', date: '08/02/2018', supplier: 'MARUBENI', supplier_pin: 'C1300.30',
        lot_n: '17F06-705A', bin_n: '', qty_wafer: 2389, manufacturing_date: '', test_current: '',
        min: '', average: '', max: '', units: ''
      },
      // 4456 //
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
      }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // Automatically resize columns
    this.gridApi.setHeaderHeight(64);
    params.api.sizeColumnsToFit();
    // this.autoSizeAll();
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

function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function(params) {
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
    $(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
  };
  Datepicker.prototype.getGui = function() {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function() {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function() {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function() {};
  Datepicker.prototype.isPopup = function() {
    return false;
  };
  return Datepicker;
}
