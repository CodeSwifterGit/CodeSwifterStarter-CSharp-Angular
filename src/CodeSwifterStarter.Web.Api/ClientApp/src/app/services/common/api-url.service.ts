import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  baseApiUrl: string;

  constructor() {
    switch (window.location.hostname) {
    case 'localhost':
      this.baseApiUrl = '/';
      break;
    case 'dev.codeswifter.com':
      this.baseApiUrl = 'https://dev.codeswifterstarter.com/';
      break;
    case 'uat.codeswifter.com':
      this.baseApiUrl = 'https://uat.codeswifterstarter.com/';
      break;
    default:
      this.baseApiUrl = 'https://codeswifterstarter.com/';
      break;
    }
  }
}
