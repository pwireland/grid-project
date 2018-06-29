import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get('/api/users')
      .map(result => this.result = result.json().data);
  }

}
