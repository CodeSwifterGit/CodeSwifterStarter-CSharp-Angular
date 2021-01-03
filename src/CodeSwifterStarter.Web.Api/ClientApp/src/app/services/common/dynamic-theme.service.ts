import { Injectable } from '@angular/core';
import { selectedThemeEnum, SelectedThemeEnum } from 'app/models/misc/enums/selected-theme.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicThemeService {
  private onThemeChangedSubject = new BehaviorSubject<SelectedThemeEnum>(selectedThemeEnum.Dark);
  onThemeChanged = this.onThemeChangedSubject.asObservable();

  constructor() {}

  toogle() {
    this.onThemeChangedSubject.next(
      this.onThemeChangedSubject.value === selectedThemeEnum.Dark ? selectedThemeEnum.Light : selectedThemeEnum.Dark);
  }

  get value(): SelectedThemeEnum {
    return this.onThemeChangedSubject.value;
  }
}
