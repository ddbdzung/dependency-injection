import { InjectionToken } from "./token";
import { Injectable } from "./container";
import { IUserModule } from "./user.module.interface";

// export const UserModuleToken = new InjectionToken<IUserModule>("UserModule");

@Injectable
export class UserModule implements IUserModule {
  private _fullName: string;

  constructor() {}

  get fullName(): string {
    return this._fullName;
  }

  public createUser(fullName: string) {
    this._fullName = fullName;
    return this;
  }
}
