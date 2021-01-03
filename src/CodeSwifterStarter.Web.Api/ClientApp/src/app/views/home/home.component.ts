import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReactiveObject } from 'app/models/misc/reactive-object';
import { AuthService } from 'app/services/auth/auth.service';
import { ComponentCacheService } from 'app/services/common/component-cache.service';
import { DynamicThemeService } from 'app/services/common/dynamic-theme.service';
import { ToastMessageService } from 'app/services/common/toast-message.service';
import { ConfirmationDialogComponent, ConfirmationDialogData } from 'app/views/shared/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private _destroy$ = new Subject<boolean>();

  signInInformation = new ReactiveObject<string>('Not signed in', this.componentCacheService, 'home/signInInformation');

  constructor(
    private readonly dynamicThemeService: DynamicThemeService,
    private readonly toastMessageService: ToastMessageService,
    private readonly authService: AuthService,
    private readonly componentCacheService: ComponentCacheService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.userProfile$
      .pipe(
        takeUntil(this._destroy$),
        )
      .subscribe(result => {
        if (!!result && !!result.sub) {
          this.signInInformation.value = `Signed in as {result.sub}`;
        } else {
          this.signInInformation.value = 'Not signed in';
        }
      });
  }


  toogleTheme() {
    this.dynamicThemeService.toogle();
  }

  showMessage() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: new ConfirmationDialogData({ title: 'Information', body: `This dialog rocks`, confirmButton: "OK", twoButtons: false })
    });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this._destroy$)
    ).subscribe(result => {
      if (result) {
        environment.logToConsole('User selected to remove the row.');
      }
    });
  }

  showConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: new ConfirmationDialogData({ title: 'Warning', body: `This will remove the row.\nAre you sure?` })
    });

    dialogRef.afterClosed().pipe(
      take(1),
      takeUntil(this._destroy$)
    ).subscribe(result => {
      if (result) {
        environment.logToConsole('User selected to remove the row.');
      }
    });
  }

  showToastMessage() {
    this.toastMessageService.show('Unable to load the list of security policies. Please try again or reload the page.',
      environment.shortToastMessageDuration);
  }

  showToastAlert() {
    this.toastMessageService.show('Unable to load the list of items. Please try again or reload the page.',
      environment.longToastMessageDuration,
      true,
      "Reload", () => { window.location.reload(); });
  }

  signInToggle() {
    if (!this.authService.isAuthenticated$) {
      this.authService.login(location.href);
    } else {
      this.authService.logout();
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
