import { Injectable } from '@angular/core';

import { HttpClient } from '../../node_modules/@angular/common/http';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  /*********************************************/
  /*                  LEDS                     */
  /*********************************************/

  getLeds(): Observable<any[]> {
    return this._http.get<any[]>('/api/leds');
  }

  addLed(obj: any, callback?: (err, res) => void) {
    this._http.post('/api/leds/update', obj)
      .subscribe(
        res => {
          console.log('Worked');
          callback(null, res);
        },
        err => {
          console.log('Error occured during addLed');
          callback(err, null);
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

  addSupplier(obj: any, callback?: (err, res) => void) {
    this._http.post('/api/suppliers/add', obj)
      .subscribe(
        res => {
          console.log('Worked');
          callback(null, res);
        },
        err => {
          console.log('Error occured in addSupplier');
          callback(err, null);
        }
      );
  }

  removeSupplier(obj: any, callback?: (err, res) => void) {
    this._http.post('api/suppliers/remove', obj)
    .subscribe(
      res => {
        console.log('Worked');
        callback(null, res);
      },
      err => {
        console.log('Error occured in removeSupplier');
        callback(err, null);
      }
    );
  }

  /*********************************************/
  /*                 USERS                     */
  /*********************************************/

  getUsers(): Observable<any[]> {
    return this._http.get<any[]>('/api/users');
  }

  updateUserRole(obj: any, callback?: (err, res) => void) {
    this._http.post('/api/users/updateRole', obj)
      .subscribe(
        res => {
          console.log('Worked');
          callback(null, res);
        },
        err => {
          console.log('Error occured during updateUserRole');
          callback(err, null);
        }
      );
  }

  /*********************************************/
  /*                LOG FILE                   */
  /*********************************************/

  logSave(obj: Array<string>, callback?: (err, res) => void) {
    this._http.post('/api/leds/logSave', obj)
    .subscribe(
      res => {
        callback(null, res);
      },
      err => {
        console.log('Error occured during logSave');
        callback(err, null);
      }
    );
  }

}
