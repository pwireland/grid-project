import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  getLeds() {
    return this._http.get('/api/leds')
      .pipe(map(res => res.json()));
  }

  saveRow(obj: any) {
    this._http.post('/api/leds/update', obj)
      .subscribe(
        res => {
          console.log('Worked');
        },
        err => {
          console.log('Error occured during saveRow');
        }
      );
  }

  deleteLed(obj: any) {
    this._http.post('/api/leds/remove', obj)
      .subscribe(
        res => {
          console.log('Worked');
        },
        err => {
          console.log('Error occured during deleteLed');
        }
      );
  }

  deleteAllLeds() {
    this._http.post('/api/leds/removeAll', {})
      .subscribe(
        res => {
          console.log('Worked');
        },
        err => {
          console.log('Error occured during deleteAllLeds');
        }
      );
  }
}
