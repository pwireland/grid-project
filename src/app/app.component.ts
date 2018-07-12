import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { DataService } from './data.service';
import { ValueParserParams } from 'ag-grid/dist/lib/entities/colDef';

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

  title = 'Grid Project app';

  private columnDefs;
  private defaultColDef;
  private components;
  private gridApi;
  private gridColumnApi;
  private cacheBlockSize;
  private maxBlocksInCache;

  private rowData: any[];               // ag-grid - Stores grid data to be displayed
  private leds: Array<any>;             // Stores leds data fetched from the database

  private unsavedRow: Array<any> = [];  // Stores ids (wafer_n) of rows that need to be saved in the database

  // Defines column headers and parameters
  constructor(private _dataService: DataService) {
    this.columnDefs = [
      {
        headerName: 'PROPHOTONIX DATA',
        headerClass: 'gHeader1',
        children: [
          { headerName: 'Wafer no.', field: 'wafer_n', cellClass: 'cell-wafer-n', headerClass: 'headerMain', sort: 'asc',
            comparator: function(valueA, valueB, nodeA, nodeB, isInverted) {
              const nums1 = (valueA + '').split('.');
              const nums2 = (valueB + '').split('.');

              for (let i = 0; i < nums1.length; i++) {
                if (nums2[i]) {
                  if (nums1[i] !== nums2[i]) {
                    return parseFloat(nums1[i]) - parseFloat(nums2[i]);
                  } // else continue
                } else {
                  return 1; // no second number in b
                }
              }
              return -1;
            }
          },
          { headerName: 'LED No.', field: 'led_n', cellClass: 'cell-led-n' },
          { headerName: 'Date', field: 'date', headerClass: 'headerMain', cellEditor: 'datePicker',
            comparator: function(valueA, valueB, nodeA, nodeB, isInverted) {
              const date1Number = monthToComparableNumber(valueA);
              const date2Number = monthToComparableNumber(valueB);
              if (date1Number === null && date2Number === null) {
                return 0;
              }
              if (date1Number === null) {
                return -1;
              }
              if (date2Number === null) {
                return 1;
              }
              return date1Number - date2Number;
            }
          }
        ]
      },
      {
        headerName: 'SUPPLIER DATA',
        headerClass: 'gHeader2',
        children: [
          { headerName: 'Supplier', field: 'supplier', cellClass: 'cell-supplier',
          cellEditor: 'agRichSelectCellEditor',
          cellEditorParams: {
              values: [
                  'EPIGAP',
                  'EPISTAR',
                  'MARUBENI'
              ]
            }
          },
          { headerName: 'Supplier PIN or Type', field: 'supplier_pin' },
          { headerName: 'Scan or enter Lot/Batch No.', field: 'lot_n', cellClass: 'cell-lot-n' },
          { headerName: 'Bin. Grade or Kit Number', field: 'bin_n', cellClass: 'cell-bin-n' },
          { headerName: 'Qty on Wafer', field: 'qty_wafer', type: 'numericColumn',
            headerClass: 'headerMain', filter: 'agNumberColumnFilter',
            valueSetter: this.waferValidator },
          { headerName: 'Manufacturing date', field: 'manufacturing_date',
            headerClass: 'headerMain', cellEditor: 'datePicker',
            comparator: function(valueA, valueB, nodeA, nodeB, isInverted) {
              const date1Number = monthToComparableNumber(valueA);
              const date2Number = monthToComparableNumber(valueB);
              if (date1Number === null && date2Number === null) {
                return 0;
              }
              if (date1Number === null) {
                return -1;
              }
              if (date2Number === null) {
                return 1;
              }
              return date1Number - date2Number;
            }
          },
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

    this.cacheBlockSize = 100;
    this.maxBlocksInCache = 2;

    // Default column options
    this.defaultColDef = {
      editable: true,
      filter: 'agTextColumnFilter',
      menuTabs: ['filterMenuTab'],
      headerClass: 'headerMain'
    };
  }

  ngOnInit() {}

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // Access the Data Service's getLeds() method to fill the grid
    // this._dataService.getLeds().subscribe(data => {
    //   this.rowData = data;
    //   console.log(data);
    // });
    this.rowData = [
      {
      wafer_n: 4436, led_n: 'LED0020', date: '07/02/2018', supplier: 'EPIGAP', supplier_pin: 'ELOC-870-11',
      lot_n: '2626H/003/6', bin_n: '', qty_wafer: 1412, manufacturing_date: '01/01/1970', test_current: '20mA',
      min: 1.31, average: 1.33, max: 1.33, units: 'V'
      },
      {
      wafer_n: 4437, led_n: 'LED0020', date: '07/02/2018', supplier: 'EPIGAP', supplier_pin: 'ELOC-870-11',
      lot_n: '2626H/0037a', bin_n: '', qty_wafer: 210, manufacturing_date: '01/01/1970', test_current: '20mA',
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
      wafer_n: 4456, led_n: 'LED0153', date: '08/02/2018', supplier: 'SEOUL VIOSYS', supplier_pin: 'UV1000-39L26',
      lot_n: '17M31V0206', bin_n: '', qty_wafer: 1000, manufacturing_date: '', test_current: '',
      min: 3.40, average: 3.47, max: 3.50, units: ''
      },
      {
      wafer_n: 4457, led_n: 'LED0153', date: '08/02/2018', supplier: 'SEOUL VIOSYS', supplier_pin: 'UV1000-39L26',
      lot_n: '17M31V0318', bin_n: '', qty_wafer: 1000, manufacturing_date: '', test_current: '',
      min: 3.40, average: 3.49, max: 3.50, units: ''
      },
      {
      wafer_n: 4458, led_n: 'LED012', date: '12/02/2018', supplier: 'EPIGAP', supplier_pin: 'EOLC-740-27-2',
      lot_n: '27144/174/6', bin_n: '', qty_wafer: 4838, manufacturing_date: '', test_current: '20mA',
      min: '1.62', average: '1.65', max: '1.68', units: ''
      },
      {
      wafer_n: 4459, led_n: 'LED012', date: '12/02/2018', supplier: 'EPIGAP', supplier_pin: 'EOLC-740-27-2',
      lot_n: '27144/174/7', bin_n: '', qty_wafer: 5275, manufacturing_date: '', test_current: '20mA',
      min: '1.60', average: '1.64', max: '1.68', units: ''
      },
      {
      wafer_n: 4460, led_n: 'LED012', date: '12/02/2018', supplier: 'EPIGAP', supplier_pin: 'EOLC-740-27-2',
      lot_n: '27144/174/9', bin_n: '', qty_wafer: 4574, manufacturing_date: '', test_current: '20mA',
      min: '1.60', average: '1.62', max: '1.65', units: ''
      },
      {
      wafer_n: 4461, led_n: '', date: '', supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
      manufacturing_date: '', test_current: '', min: '', average: '', max: '', units: ''
      },
      {
      wafer_n: 4462, led_n: '', date: '', supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
      manufacturing_date: '', test_current: '', min: '', average: '', max: '', units: ''
      },
      {
      wafer_n: 4463, led_n: '', date: '', supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
      manufacturing_date: '', test_current: '', min: '', average: '', max: '', units: ''
      },
      {
      wafer_n: 4464, led_n: '', date: '', supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
      manufacturing_date: '', test_current: '', min: '', average: '', max: '', units: ''
      },
      {
      wafer_n: 4465, led_n: '', date: '', supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
      manufacturing_date: '', test_current: '', min: '', average: '', max: '', units: ''
      },
      {
      wafer_n: 4466, led_n: '', date: '', supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: 0,
      manufacturing_date: '', test_current: '', min: '', average: '', max: '', units: ''
      }
    ];

    // Automatically resize columns
    this.gridApi.setHeaderHeight(65);
    params.api.sizeColumnsToFit();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.wafer_n).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  /**
   *  Adds a new empty row to the grid.
   */
  onAddRow() {
    let max = 0;
    this.gridApi.forEachNode(function (node, index) {
      if (node.data.wafer_n > max) {
        max = node.data.wafer_n;
      }
    });
    max = Math.floor(max) + 1;
    const newItem = {
      wafer_n: max, led_n: '', date: '', supplier: '', supplier_pin: '', lot_n: '', bin_n: '', qty_wafer: '',
      manufacturing_date: '', test_current: '', min: '', average: '', max: '', units: ''
    };
    const res = this.gridApi.updateRowData({ add: [newItem] });
    this.addUnsavedRow(newItem.wafer_n);
  }

  onCloneSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    for (const rowNode of selectedNodes) {
      const rowData = Object.assign({}, rowNode.data);    // Make a copy of the row
      rowData.wafer_n = this.incrementDecimal(rowData.wafer_n);
      this.gridApi.updateRowData({ add: [rowData], addIndex: (rowNode.rowIndex + 1)});
      this.addUnsavedRow(rowData.wafer_n);
    }
  }

  incrementDecimal(num: Number) {
    const numStr = (num + '').split('.');
    let newDecimal;
    if (numStr[1]) {
      newDecimal = parseFloat(numStr[1]) + 1;
    } else {
      newDecimal = 1;
    }
    return (parseFloat(numStr[0] + '.' + newDecimal)).toFixed((newDecimal + '').length);
  }

  /**
   *  Removes selected rows from the grid and the database.
   */
  onRemoveSelected() {
    if (confirm('Are you sure you want to delete the selected rows? This cannot be undone.')) {
      const selectedData = this.gridApi.getSelectedRows();
      for (const led of selectedData) {
        this._dataService.deleteLed(led);
      }
      const res = this.gridApi.updateRowData({ remove: selectedData });
    }
  }

  // The value setter function acts as a validator
  private waferValidator(params: ValueParserParams) {
    // Value is legit - set it and signal the value has been changed/set
    if (params.newValue <= 10000) {
      params.data[params.colDef.field] = params.newValue;
      return true;
    }
    // Illegal value - signal no change
    alert('The value cannot be greater than 10,000');
    return false;
  }

  /**
   * Parses all grid's lines and return them as a JSON object
   */
  parseAllLines() {
    const allNodes = [];
    this.gridApi.forEachNode(function (rowNode, index) {
      allNodes.push(rowNode);
    });
    const allData = allNodes.map(node => node.data);
    const obj = JSON.stringify(allData);
    console.log(obj);
    return obj;
  }

  /**
   * Triggered when a cell is edited.
   * @param rowNode Contains the modified row's node.
   */
  onCellValueChanged(rowNode: any) {
    const id = rowNode.data.wafer_n;
    this.addUnsavedRow(id);
  }

  /**
   * Saves every unsaved row into the database, clearing unsaved changes in the process.
   */
  saveGridData() {
    const self = this;
    this.gridApi.forEachNode( function (rowNode, index) {
      if (self.unsavedRow.includes(rowNode.data.wafer_n)) {
        self._dataService.saveRow(rowNode.data);
      }
    });
    this.clearUnsavedRows();
  }

  /**
   * Adds a row id to the unsaved rows' list.
   * @param rowId The id to add.
   */
  addUnsavedRow(rowId: Number) {
    if (rowId !== 0 && !this.unsavedRow.includes(rowId)) {
      this.unsavedRow.push(rowId);
      document.getElementById('saveButton').removeAttribute('disabled');
      /* DEBUG */
      // console.log('Pushed ' + rowId);
      // console.log('Currently in buffer: ' + this.unsavedRow);
    }
  }

  /**
   * Clears the list of unsaved changes and reset the "Save" button.
   */
  clearUnsavedRows() {
    this.unsavedRow.length = 0;
    document.getElementById('saveButton').setAttribute('disabled', 'disabled');
  }

  /**
   * DEBUG - Completely clears the database (use with caution).
   */
  clearDatabase() {
    if (confirm('Are you sure you want to completely CLEAR the database? This cannot be undone.')) {
      this._dataService.deleteAllLeds();
    }
  }
}

function monthToComparableNumber(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }
  const yearNumber = date.substring(6, 10);
  const monthNumber = date.substring(3, 5);
  const dayNumber = date.substring(0, 2);
  const result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  return result;
}

/**
* Initialize JQuery-ui datepicker
*/
function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function(params) {
    this.eInput = document.createElement('input');
    this.eInput.value = params.value;
    // Datepicker initialization: maxDate = today (0)
    $(this.eInput).datepicker({ dateFormat: 'dd/mm/yy', maxDate: 0 });
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
