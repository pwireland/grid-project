import { Injectable, TestabilityRegistry } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  exp: number;
  iat: number;
  role: string;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Token setter.
   * @param token Token to save.
   */
  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  /**
   * Token getter.
   */
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  /**
   * Delete the token on logout.
   */
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  /**
   * Get user details using the user's token.
   */
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public isAdmin(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return (user.role === 'Admin');
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'changePassword'|'grid'|'supplier-management',
    user?: TokenPayload): Observable<any> {

    let base;

    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public changePassword(newDetails): Observable<any> {
    return this.request('post', 'changePassword', newDetails);
  }

  public grid(): Observable<any> {
    return this.request('get', 'grid');
  }

  public supplierManagement(): Observable<any> {
    return this.request('get', 'supplier-management');
  }

}
