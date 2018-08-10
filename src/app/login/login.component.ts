import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { IAlert } from '../ialert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    username: '',
    password: ''
  };

  private alerts: Array<IAlert> = [];

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      console.log('Login successful');
      this.router.navigateByUrl('/grid');
    }, (err) => {
      console.error(err);
      this.alerts.pop();
      this.alerts.push({ type: 'danger', message: err.error.message });
    });
  }

  closeAlert(alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
