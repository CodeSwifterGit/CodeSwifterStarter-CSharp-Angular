import config from '../../auth_config.json';

export const environment = {
  production: true,
  mainBranchName: 'main',
  // ReSharper disable once TsResolvedFromInaccessibleModule
  authConfig: config.authConfig.prod,
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
  requestTimeoutHeaderName: 'CODESWIFTER-REQUEST-TIMEOUT',
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
  logToConsole: function (...message) { }
};
