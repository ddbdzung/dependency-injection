import { Injectable } from "./container";
import { IUserModule } from "./user.module.interface";

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
