import {
    RouteReuseStrategy,
    ActivatedRouteSnapshot,
    DetachedRouteHandle
  } from "@angular/router";
  
  export class CustomReusingStrategy implements RouteReuseStrategy {
    shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
    shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null { return null; }
    shouldReuseRoute(
      future: ActivatedRouteSnapshot,
      current: ActivatedRouteSnapshot
    ): boolean {
      if (
        future.routeConfig &&
        future.routeConfig.data &&
        future.routeConfig.data.reuse !== undefined
      ) {
        return future.routeConfig.data.reuse;
      }
      return future.routeConfig === current.routeConfig;
    }
   
  }