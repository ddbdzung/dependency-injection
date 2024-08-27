export class InjectionToken<T> {
  private _token: string | symbol | number;

  constructor(token: string | symbol | number) {
    this._token = token;
  }

  public get token() {
    return this._token;
  }
}
