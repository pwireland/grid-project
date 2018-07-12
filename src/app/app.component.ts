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
          { headerName: 'Wafer no.', field: 'wafer_n', cellClass: 'cell-wafer-n', headerClass: 'headerMain' },
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
    this._dataService.getLeds().subscribe(data => {
      this.rowData = data;
      console.log(data);
    });

    // Automatically resize columns
    this.gridApi.setHeaderHeight(65);
    params.api.sizeColumnsToFit();
    // this.autoSizeAll();
  }

  // Automatically resize columns
  // autoSizeAll() {
  //   const allColumnIds = [];
  //   this.gridColumnApi.getAllColumns().forEach(function(column) {
  //     allColumnIds.push(column.colId);
  //   });
  //   this.gridColumnApi.autoSizeColumns(allColumnIds);
  // }

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
      // rowData.wafer_n = (1 * rowData.wafer_n + 0.1).toFixed(1);
      rowData.wafer_n = this.incrementDecimal(rowData.wafer_n);
      console.log('New id =' + rowData.wafer_n);
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
    console.log('Longueur: ' + (newDecimal + '').length);
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
      console.log('Pushed ' + rowId);
      console.log('Currently in stock: ' + this.unsavedRow);
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
