import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularSplitModule } from 'angular-split';
import { AppComponent } from 'app/app.component';
import { rootRouterConfig } from 'app/app.routes';
import { HttpConfigInterceptor } from 'app/services/common/httpconfig.interceptor';
import { CoreModule } from 'app/core.module';
import { SharedModule } from 'app/shared.module';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DynamicThemeService } from 'app/services/common/dynamic-theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectedThemeEnum } from 'app/models/misc/enums/selected-theme.enum';
import { environment } from 'environments/environment';
import { CustomReusingStrategy } from 'app/services/common/custom-reuse-strategy';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MatSnackBarModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularSplitModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: CustomReusingStrategy },
   ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  private _destroy$ = new Subject<boolean>();

  constructor(overlayContainer: OverlayContainer, private readonly dynamicThemeService: DynamicThemeService) {
    this.dynamicThemeService.onThemeChanged
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((themeType) => {
        let themeColorMode = themeType === selectedThemeEnum.Dark ? 'dark' : 'light';
        const overlayContainerClasses = overlayContainer.getContainerElement().classList;
        const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
        if (themeClassesToRemove.length) {
          overlayContainerClasses.remove(...themeClassesToRemove);
        }
        overlayContainerClasses.add(`${themeColorMode}-theme`);

        environment.logToConsole("Theme changed");
      });


  }
}
