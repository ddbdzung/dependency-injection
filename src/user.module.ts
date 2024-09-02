import type { IDeliverModule } from "./deliver.module.interface";
import type { IUserModule } from "./user.module.interface";

import { Inject, Injectable } from "./decorator";
import { InjectionToken } from "./token";
import { deliverModuleToken } from "./deliver.module";
import { forwardRef } from "./utility";

@Injectable
export class UserModule implements IUserModule {
  private _fullName: string;

  constructor(
    @Inject(forwardRef(() => deliverModuleToken))
    _deliverModule: IDeliverModule
  ) {}

  get fullName(): string {
    return this._fullName;
  }

  public createUser(fullName: string) {
    this._fullName = fullName;
    return this;
  }
}

export const userModuleToken = new InjectionToken(UserModule);
