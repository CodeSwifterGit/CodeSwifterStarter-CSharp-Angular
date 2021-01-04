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

  GetPermissions(observe?: 'body', reportProgress?: boolean): Observable<Array<string>>;
  GetPermissions(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<string>>>;
  GetPermissions(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<string>>>;
  GetPermissions(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let apiUrlBuilder = new ApiUrlBuilder('UserInfo/GetPermissions', {});

    return this.apiClient.get<Array<string>>(apiUrlBuilder.build(apiUrlBuilder.baseAuthUrl), { timeout: 120000 }, observe, reportProgress);
  }
}