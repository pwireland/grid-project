import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: any;

  constructor(private _http: HttpClient) { }

  /*********************************************/
  /*                  LEDS                     */
  /*********************************************/

  getLeds(): Observable<any[]> {
    return this._http.get<any[]>('/api/leds');
  }

  addLed(obj: any, callback) {
    this._http.post('/api/leds/update', obj)
      .subscribe(
        res => {
          console.log('Worked');
          callback();
        },
        err => {
          console.log('Error occured during addLed');
          callback(err);
        }
      );
  }

  removeLed(obj: any) {
    this._http.post('/api/leds/remove', obj)
      .subscribe(
        res => {
          console.log('Worked');
        },
        err => {
          console.log('Error occured during removeLed');
        }
      );
  }

  removeAllLeds() {
    this._http.post('/api/leds/removeAll', {})
      .subscribe(
        res => {
          console.log('Worked');
        },
        err => {
          console.log('Error occured during removeAllLeds');
        }
      );
  }

  /*********************************************/
  /*               SUPPLIERS                   */
  /*********************************************/

  getSuppliers(): Observable<any[]> {
    return this._http.get<any[]>('/api/suppliers');
  }

  addSupplier(obj: any) {
    this._http.post('/api/suppliers/add', obj)
      .subscribe(
        res => {
          console.log('Worked');
        },
        err => {
          console.log('Error occured in addSupplier');
        }
      );
  }

  removeSupplier(obj: any, callback?) {
    this._http.post('api/suppliers/remove', obj)
    .subscribe(
      res => {
        console.log('Worked');
      },
      err => {
        console.log('Error occured in removeSupplier');
      }
    );
  }

  /*********************************************/
  /*                 USERS                     */
  /*********************************************/

  getUsers(): Observable<any[]> {
    return this._http.get<any[]>('/api/users');
  }

  updateUserRole(obj: any, callback?) {
    this._http.post('/api/users/updateRole', obj)
      .subscribe(
        res => {
          console.log('Worked');
        },
        err => {
          console.log('Error occured during updateUserRole');
        }
      );
  }

}
