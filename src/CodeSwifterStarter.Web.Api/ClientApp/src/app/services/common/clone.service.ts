import { Injectable } from '@angular/core';
import { cloneDeep, camelCase } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class CloneService {

  deepClone<T>(value): T {
    return cloneDeep<T>(value);
  }

  nullsToUndefined(obj: any): any {
    if (obj === null) {
      return undefined;
    }
    if (typeof obj === 'object') {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = this.nullsToUndefined(obj[key]);
        }
      }
    }
    return obj;
  }

  undefinedToNulls(obj: any): any {
    if (obj === undefined) {
      return null;
    }
    if (typeof obj === 'object') {
      for (let key in obj) {
        {
          if (obj.hasOwnProperty(key)) {
            obj[key] = this.undefinedToNulls(obj[key]);
          }
        }

      }
    }
    return obj;
  }

  private toCamel(obj) {
    if (Array.isArray(obj)) {
      return obj.map(v => this.toCamel(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: this.toCamel(obj[key]),
        }),
        {},
      );
    }
    return obj;
  }

  cloneFromJson<T>(json: string): T {
    let obj = JSON.parse(json);
    let camelJson = JSON.stringify(this.toCamel(obj));
    return <T>(JSON.parse(camelJson));
  }

  private deepCompare(arg1, arg2) {
    let _this = this;
    if (Object.prototype.toString.call(arg1) === Object.prototype.toString.call(arg2)) {
      if (Object.prototype.toString.call(arg1) === '[object Object]' || Object.prototype.toString.call(arg1) === '[object Array]') {
        if (Object.keys(arg1).length !== Object.keys(arg2).length) {
          return false;
        }
        return (Object.keys(arg1).every(function(key) {
          return _this.deepCompare(arg1[key], arg2[key]);
        }));
      }
      return (arg1 === arg2);
    }
    return false;
  }


  isEqual(source: any, destination: any): boolean {
    if (source == undefined || destination == undefined || source == null || destination == null)
      return false;

    return this.deepCompare(source, destination) && this.deepCompare(destination, source);
  }
}
