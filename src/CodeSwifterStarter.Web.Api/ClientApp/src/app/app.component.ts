import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveObject } from 'app/models/misc/reactive-object';
import { ComponentCacheService } from 'app/services/common/component-cache.service';
import { DynamicThemeService } from 'app/services/common/dynamic-theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private _destroy$ = new Subject<boolean>();
  
  currentTheme = new ReactiveObject<string>(null, this.componentCacheService, 'app/currentTheme');
  
  constructor(private readonly dynamicThemeService: DynamicThemeService,
    private readonly componentCacheService: ComponentCacheService) { }

  ngOnInit(): void {
    this.dynamicThemeService.onThemeChanged
    .pipe(
      takeUntil(this._destroy$)
    )
    .subscribe((themeType) => {
      this.currentTheme.value = themeType;
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
