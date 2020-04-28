import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreUrlService {
  private _BASE_URL_LOCAL = 'http://localhost:8080/api/v1';
  private _BASE_URL = 'https://stacks-sms-uh-api.herokuapp.com/api/v1';
  private static _BASE_URL: 'https://stacks-sms-uh-api.herokuapp.com/api/v1';

  constructor() {
  }

  get BASE_URL(): string {
    return this._BASE_URL_LOCAL;
  }

  static AUTH_URL() {
    return 'https://stacks-sms-uh-api.herokuapp.com/';
  }
}
