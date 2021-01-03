import config from '../../auth_config.json';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authConfig: config.authConfig.dev,
  /**
   * The number of milliseconds to wait before the loading indicator is shown.
   */
  deferLoadingIndicator: 250,
  /**
   * The number of milliseconds to wait upon remote data request to complete, after which the loading indicator will be destroyed.
   */
  waitForPendingRemoteDataRequest: 10000,
  /**
   * The number of milliseconds until short-lasting toast message is dismissed.
   */
  shortToastMessageDuration: 2000,
  /**
   * The number of milliseconds until long-lasting toast message is dismissed.
   */
  longToastMessageDuration: 8000,
  /**
   * The number of milliseconds for timer after which async validator in unit test starts.
   */
  unitTestAsyncValidatorTimerDuration: 20,
  /**
   * The number of milliseconds for callback from async validator to unit test.
   */
  unitTestAsyncValidatorCallBackTimeout: 80,
  /** 
   * The name of timeout header.
  */
  requestTimeoutHeaderName: 'CODESWIFTERSTARTER-REQUEST-TIMEOUT',
  /** 
   * Notifications checking cycle in milliseconds.
  */
  notificationsCycle: 5000,
  /** 
   * Delays appearing matTooltip
  */
  tooltipAppearDelay: 500,
  /** 
   * Delays disappearing matTooltip
  */
  tooltipDisAppearDelay: 0,
  /**
   * Logs the messages to the console in debug mode only.
   */
  logToConsole: function (...message) { if (!this.production) console.log(...message); }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
