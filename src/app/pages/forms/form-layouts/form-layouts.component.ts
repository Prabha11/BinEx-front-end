import { Component } from '@angular/core';
import {AuthService} from '../../../@core/service/auth.service';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html',
})
export class FormLayoutsComponent {
  constructor(private authService: AuthService) {}

  login() {
    console.log('called login');
    this.authService.login();
  }

  test() {
    console.log('called test');
    this.authService.test();
  }
}
