import { Injectable } from '@angular/core';
import { HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from 'app/services/common/data.service';
import { ApiUrlBuilder } from 'app/encoders/api-url-builder';


@Injectable({ 
  providedIn: 'root' 
})
export class UserInfoService {

  constructor(protected apiClient: DataService) {

  }

  getScopes(observe?: 'body', reportProgress?: boolean): Observable<Array<string>>;
  getScopes(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<string>>>;
  getScopes(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<string>>>;
  getScopes(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let apiUrlBuilder = new ApiUrlBuilder('UserInfo/GetScopes', {});

    return this.apiClient.get<Array<string>>(apiUrlBuilder.build(apiUrlBuilder.baseAuthUrl), { timeout: 120000 }, observe, reportProgress);
  }
}