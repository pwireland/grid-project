import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';

export interface IAlert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    username: '',
    password: ''
  };

  private alerts: Array<IAlert> = [];
  private confirmPass = '';

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/grid');
    }, (err) => {
      console.error(err);
      this.alerts.pop();
      this.alerts.push({ type: 'danger', message: err.error });
    });
  }

  closeAlert(alert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
