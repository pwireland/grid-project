import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { SupplierManagementComponent } from './supplier-management/supplier-management.component';
import { GridComponent } from './grid/grid.component';

import 'ag-grid-enterprise';

const appRoutes: Routes = [
  { path: '', component: GridComponent },
  { path: 'supplier-management', component: SupplierManagementComponent },
  { path: 'grid', component: GridComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SupplierManagementComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
