import { Injectable } from '@angular/core';
import { ErrorDialogService } from './errordialog.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpXsrfTokenExtractor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError, timeout } from 'rxjs/operators';
import { ErrorDialogMessage } from 'app/models/misc/errordialog-models';
import { environment } from 'environments/environment';
import { AuthService } from '../auth/auth.service';
import { errorDialogMessageTypeEnum } from 'app/models/misc/enums/error-dialog-message-type.enum';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService, private readonly auth: AuthService,
    private readonly tokenExtractor: HttpXsrfTokenExtractor) { }

  private actions: string[] = ['POST', 'PUT', 'DELETE'];
  private forbiddenActions: string[] = ['HEAD', 'OPTIONS'];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Implement anti-forgery token
    let token = this.tokenExtractor.getToken();
    let permitted = this.findByActionName(request.method, this.actions);
    let forbidden = this.findByActionName(request.method, this.forbiddenActions);;

    if (permitted !== undefined && forbidden === undefined && token !== null) {
      request = request.clone({ setHeaders: { 'X-XSRF-TOKEN': token } });
    }

    let requestTimeout = environment.waitForPendingRemoteDataRequest;
    if (request.headers.has(environment.requestTimeoutHeaderName)) {
      requestTimeout = +request.headers.get(environment.requestTimeoutHeaderName)
    }

    // Add authorisation token
    return this.auth.getTokenSilently$().pipe(
      mergeMap(bearerToken => {
        const tokenReq = request.clone({
          setHeaders: {
            Accept: 'application/json',
            Authorization: `Bearer ${bearerToken}`,
            Content: 'application/json'
          }
        });
        //environment.logToConsole(tokenReq);
        return next.handle(tokenReq).pipe(timeout(requestTimeout));
      }),
      catchError((error: HttpErrorResponse) => {
        environment.logToConsole(error && error.error && error.error.reason ? error.error.reason : 'Unknown error.');

        let data = new ErrorDialogMessage();
        data.type = errorDialogMessageTypeEnum.Warning;

        switch (error.status) {
        case 401:
          data.title = 'HTTP_INTERCEPTOR.DANGER';
          data.message = 'HTTP_INTERCEPTOR.NOT_AUTHORIZED';
          break;
        case 403:
          data.title = 'HTTP_INTERCEPTOR.DANGER';
          data.message = 'HTTP_INTERCEPTOR.FORBIDDEN';
          break;
        case 409:
          data.title = 'HTTP_INTERCEPTOR.DANGER';
          data.message = 'HTTP_INTERCEPTOR.FORBIDDEN';
          break;
        case 410:
          data.title = 'HTTP_INTERCEPTOR.DANGER';
          data.message = 'HTTP_INTERCEPTOR.CONFLICT';
          break;
        default:
          data.title = 'HTTP_INTERCEPTOR.DANGER';
          data.message = 'HTTP_INTERCEPTOR.GONE';
          break;
        }

        this.errorDialogService.addMessage(data);
        return throwError(error);
      })
    );
  }

  private findByActionName(name: string, actions: string[]): string {
    return actions.find(action => action.toLocaleLowerCase() === name.toLocaleLowerCase());
  }
}
