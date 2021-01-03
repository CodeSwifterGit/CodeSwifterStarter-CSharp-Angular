import { Injectable } from '@angular/core';
import { CloneService } from './clone.service';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  property: string = null;
  direction = 1;

  constructor(private readonly cloneService: CloneService) {

  }

  sort<T>(collection: Array<T>, prop: any, descending: boolean): Array<T> {
    this.property = prop;
    this.direction = descending ? 1 : -1;

    collection.sort((a: any, b: any) => {
      let aVal: any;
      let bVal: any;

      // Handle resolving complex properties such as 'state.name' for prop value
      if (prop && prop.indexOf('.') > -1) {
        aVal = this.resolveProperty(prop, a);
        bVal = this.resolveProperty(prop, b);
      } else {
        aVal = a[prop];
        bVal = b[prop];
      }

      // Fix issues that spaces before/after string value can cause such as ' San Francisco'
      if (this.isString(aVal)) {
        aVal = aVal.trim().toUpperCase();
      }
      if (this.isString(bVal)) {
        bVal = bVal.trim().toUpperCase();
      }

      if (aVal === bVal) {
        return 0;
      } else if (aVal > bVal) {
        return this.direction * -1;
      } else {
        return this.direction * 1;
      }
    });

    return this.cloneService.deepClone<Array<T>>(collection);
  }

  isString(val: any): boolean {
    return (val && (typeof val === 'string' || val instanceof String));
  }

  resolveProperty(path: string, obj: any) {
    return path.split('.').reduce(function(prev, curr) {
        return (prev ? prev[curr] : undefined);
      },
      obj || self);
  }

}