import { Injectable } from '@angular/core';
import { IDictionaryItem } from 'app/models/misc/dictionary-item';

@Injectable({
  providedIn: 'root'
})
export class ComponentCacheService {
  private _cache = new Map<string, any>();

  constructor() { }

  get(key: string): IDictionaryItem {
    if (this._cache.has(key)) {
      return {
        found: true,
        value: this._cache.get(key)
      };
    } else {
      return {
        found: false,
        value: null
      };
    }
  }

  set(key: string, value: any) {
    this._cache.set(key, value);
  }
}

