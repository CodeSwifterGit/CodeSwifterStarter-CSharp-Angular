import { Injectable, SecurityContext } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastMessageComponent } from 'app/views/shared/toast-message/toast-message.component';
import { take } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {
  private actionTrigger: Subject<boolean> = new Subject();
  private action$ = this.actionTrigger.asObservable();

  constructor(private readonly sanitizer: DomSanitizer, private snackBar: MatSnackBar) {}

  show(message: String, durationInMilliSeconds: number = environment.shortToastMessageDuration, alert: boolean = false, actionName?: string | null, action?: () => void | null) {
    if (!!message) {
      message = this.sanitizer.sanitize(SecurityContext.HTML, message);

      if (!!actionName) {
        this.action$.pipe(take(1)).subscribe(r => {
          action();
        });

        let snackBarRef = this.snackBar.openFromComponent(ToastMessageComponent,
          {
            duration: durationInMilliSeconds,
            panelClass: alert ? 'alert' : 'normal',
            data: { message: message, actionName: actionName, trigger: this.actionTrigger }
          });

        snackBarRef.onAction().subscribe(() => {
          action();
          snackBarRef.dismiss();
        });
      } else {
        this.snackBar.openFromComponent(ToastMessageComponent,
          {
            duration: durationInMilliSeconds,
            panelClass: alert ? 'alert' : 'normal',
            data: { message: message, actionName: actionName, trigger: null }
          });
      }
    }
  }
}
