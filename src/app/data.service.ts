import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  /*********************************************/
  /*                  LEDS                     */
  /*********************************************/

  getLeds() {
    return this._http.get('/api/leds')
      .pipe(map(res => res.json()));
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

  getSuppliers() {
    return this._http.get('/api/suppliers')
      .pipe(map(res => res.json()));
  }

  addSupplier(obj: any) {
    this._http.post('/api/suppliers/add', obj)
      .subscribe(
        res => {
          console.log('Worked');
        },
        err => {
          return false;
        }
      );
  }

  removeSupplier(obj: any) {
    this._http.post('api/suppliers/remove', obj)
    .subscribe(
      res => {
        console.log('Worked');
      },
      err => {
        return false;
      }
    );
  }

}
