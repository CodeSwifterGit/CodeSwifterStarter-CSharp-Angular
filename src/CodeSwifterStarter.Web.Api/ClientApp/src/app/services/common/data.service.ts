import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { ApiUrlService } from './api-url.service';
import { Observable } from 'rxjs';
import { CustomHttpUrlEncodingCodec } from 'app/encoders/custom-http-url-encoding-codec';
import { environment } from 'environments/environment';
import { IRequestOptions } from 'app/models/data/common/request-options';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly api: ApiUrlService, private readonly http: HttpClient) {

  }

  httpOptions(parameters?: HttpParams, observe: any = 'body', reportProgress: boolean = false, timeout: number = environment.waitForPendingRemoteDataRequest) {

    const headers = (new HttpHeaders())
      .append('Content-Type', 'application/json')
      .append(environment.requestTimeoutHeaderName, timeout.toString());

    if (!parameters)
      parameters = new HttpParams();


    if (parameters.keys().length === 0)
      return {
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      };
    else
      return {
        headers: headers,
        params: parameters,
        observe: observe,
        reportProgress: reportProgress
      };
  }

  get<TResult>(requestUrl: string, options?: IRequestOptions, observe?: 'body', reportProgress?: boolean): Observable<TResult>;
  get<TResult>(requestUrl: string, options?: IRequestOptions, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TResult>>;
  get<TResult>(requestUrl: string, options?: IRequestOptions, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TResult>>;
  get<TResult>(requestUrl: string, options?: IRequestOptions, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    const timeout = !!options ? options.timeout : environment.waitForPendingRemoteDataRequest;

    return this.http.get<TResult>(requestUrl, this.httpOptions(this.buildQueryParameters(options), observe, reportProgress, timeout));
  }

  create<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'body', reportProgress?: boolean): Observable<TResult>;
  create<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TResult>>;
  create<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TResult>>;
  create<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    const timeout = !!options ? options.timeout : environment.waitForPendingRemoteDataRequest;

    return this.http.post<TResult>(requestUrl, model, this.httpOptions(this.buildQueryParameters(options), observe, reportProgress, timeout));
  }

  update<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'body', reportProgress?: boolean): Observable<TResult>;
  update<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TResult>>;
  update<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TResult>>;
  update<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    const timeout = !!options ? options.timeout : environment.waitForPendingRemoteDataRequest;

    return this.http.put<TResult>(requestUrl, model, this.httpOptions(this.buildQueryParameters(options), observe, reportProgress, timeout));
  }

  delete(requestUrl: string, options?: IRequestOptions, observe?: 'body', reportProgress?: boolean): Observable<any>;
  delete(requestUrl: string, options?: IRequestOptions, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  delete(requestUrl: string, options?: IRequestOptions, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  delete(requestUrl: string, options?: IRequestOptions, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    const timeout = !!options ? options.timeout : environment.waitForPendingRemoteDataRequest;

    return this.http.delete<any>(requestUrl, this.httpOptions(this.buildQueryParameters(options), observe, reportProgress, timeout));
  }

  post<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'body', reportProgress?: boolean): Observable<TResult>;
  post<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TResult>>;
  post<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TResult>>;
  post<TRequest, TResult>(requestUrl: string, model: TRequest, options?: IRequestOptions, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    const timeout = !!options ? options.timeout : environment.waitForPendingRemoteDataRequest;
    
    return this.http.post<TResult>(requestUrl, model, this.httpOptions(this.buildQueryParameters(options), observe, reportProgress, timeout));
  }

  buildQueryParameters(requestOptions?: IRequestOptions): HttpParams {

    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    
    if (!!requestOptions) {
      // Prepare sorting-related parameters
      var formattedSortedColumns = (requestOptions.sortByExpression || []).map(c => `${c.name}|${c.direction}`);
      if (formattedSortedColumns) {
        formattedSortedColumns.forEach((element) => {
          queryParameters = queryParameters.append('sortByExpression', <any>element);
        });
      }

      // Prepare filtering-related parameters
      if (!!requestOptions.filterQuery) {
        queryParameters = queryParameters.set('filterQuery', requestOptions.filterQuery);
        if (requestOptions.filterParameters) {
          requestOptions.filterParameters.forEach((element) => {
            queryParameters = queryParameters.append('filterParameters', <any>element);
          });
        } else {
          queryParameters = queryParameters.append('filterParameters', '');
        } 
      }

      // Prepare paging-related parameters
      if (requestOptions.pageIndex !== undefined && requestOptions.pageIndex != null) {
        queryParameters = queryParameters.set('pageIndex', <any>requestOptions.pageIndex);
      }
      if (requestOptions.pageSize !== undefined && requestOptions.pageSize != null) {
        queryParameters = queryParameters.set('pageSize', <any>requestOptions.pageSize);
      }
    }

    return queryParameters;
  }
}
