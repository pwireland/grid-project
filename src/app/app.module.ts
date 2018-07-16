import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';

import 'ag-grid-enterprise';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { SupplierManagementComponent } from './supplier-management/supplier-management.component';

@NgModule({
  declarations: [
    AppComponent,
    SupplierManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
