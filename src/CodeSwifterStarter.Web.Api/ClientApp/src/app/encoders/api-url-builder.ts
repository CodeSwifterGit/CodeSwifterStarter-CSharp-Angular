export class ApiUrlBuilder {
  private routeParts = new Array<string>();
  readonly baseApiUrl: string = 'api';
  readonly baseAuthUrl: string = 'auth';

  constructor(basePath: string, routeParts: {}) {
    // In case baseBath contains a slash character, take every part of it and add it to the routeParts
    basePath.split('/').forEach(r => {
      if (r.trim() !== '')
        this.routeParts.push(encodeURIComponent(String(r.split('/').join(''))));
    });

    // Add all supplied routeParts
    for (let key in routeParts) {
      if (Object.prototype.hasOwnProperty.call(routeParts, key)) {

        // Throw if any parameter is null
        let parameterValue: string = routeParts[key];
        if (parameterValue === null || parameterValue === undefined) {
          throw new Error(`Required parameter ${key} was null or undefined when performing API call to ${basePath}.`);
        }

        // Enforce string value, otherwise split function won't work below
        parameterValue = parameterValue + '';

        parameterValue.split('/').forEach(r => {
          if (r.trim() !== '')
            this.routeParts.push(encodeURIComponent(String(r.split('/').join(''))));
        });
      }
    }
  }

  build(apiUrl: string = this.baseApiUrl) : string {
    return `${apiUrl}/${this.routeParts.join('/')}`;
  }
}
