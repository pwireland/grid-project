import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { UserManagementComponent } from './user-management/user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EqualValidatorDirective } from './equal-validator.directive';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'supplier-management', component: SupplierManagementComponent, canActivate: [AdminGuardService] },
  { path: 'grid', component: GridComponent, canActivate: [AuthGuardService], canDeactivate: [PendingChangesGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AdminGuardService] },
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SupplierManagementComponent,
    GridComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    UserProfileComponent,
    EqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [DataService, PendingChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
