export type InjectionTokenType = string | symbol | number;

export class InjectionToken {
  private _token: InjectionTokenType;

  constructor(token: InjectionTokenType) {
    this._token = token;
  }

  public get token() {
    return this._token;
  }
}
