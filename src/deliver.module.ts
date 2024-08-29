import { IUserModule } from "./user.module.interface";
import type { IDeliverModule } from "./deliver.module.interface";
import type { IOfficeModule } from "./office.module.interface";

import { InjectionToken } from "./token";
import { Inject, Injectable } from "./decorator";
import { userModuleToken } from "./user.module";
import { officeModuleToken } from "./office.module";
import { forwardRef } from "./utility";

// Not following the Single Responsibility Principle
// Not willing to change the UserModule and OfficeModule classes because they are used in other parts of the application
// export class DeliverModule {
//   private _officeModule: OfficeModule;
//   private _userModule: UserModule;

//   constructor() {
//     this._officeModule = new OfficeModule();
//     this._userModule = new UserModule();
//   }

//   public userDrivingToOffice(): void {
//     console.log(`User ${this._userModule.fullName} driving to office`);
//   }
// }

// TODO: Convert to optional token string (as long as it is unique value)
@Injectable
export class DeliverModule implements IDeliverModule {
  constructor(
    @Inject(forwardRef(() => userModuleToken))
    private _userModule: IUserModule,
    @Inject(officeModuleToken)
    private _officeModule: IOfficeModule
  ) {}

  userDrivingToOffice(): void {
    console.log("User driving to office");
    this._userModule.createUser("Dzung Dang");
    this._officeModule.userArrivedToOffice();
  }
}

export const deliverModuleToken = new InjectionToken("DeliverModule").bindTo(
  DeliverModule
);
