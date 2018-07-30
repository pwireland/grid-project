import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SupplierManagementComponent } from './supplier-management/supplier-management.component';
import { GridComponent } from './grid/grid.component';
import { PendingChangesGuard } from './pending-changes.guard';

import 'ag-grid-enterprise';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { AdminGuardService } from './admin-guard.guard';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'supplier-management', component: SupplierManagementComponent, canActivate: [AdminGuardService] },
  { path: 'grid', component: GridComponent, canActivate: [AuthGuardService], canDeactivate: [PendingChangesGuard] },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SupplierManagementComponent,
    GridComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [DataService, PendingChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
