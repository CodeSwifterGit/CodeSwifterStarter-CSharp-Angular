import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentCacheService {
  private _cache = new Map<string, any>();

  constructor() { }

  get(key: string) {
    return this._cache.get(key);
  }

  set(key: string, value: any) {
    this._cache.set(key, value);
  }
}
