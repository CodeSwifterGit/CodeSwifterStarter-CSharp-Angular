import { Injectable, SecurityContext } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorDialogMessage } from 'app/models/misc/errordialog-models';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class ErrorDialogService {
  alert = new Subject<ErrorDialogMessage>();

  constructor(private readonly sanitizer: DomSanitizer) {}

  addMessage(alert: ErrorDialogMessage) {
    if (!!alert) {
      alert.message = this.sanitizer.sanitize(SecurityContext.HTML, alert.message);
      this.alert.next(alert);
    }
  }
}
