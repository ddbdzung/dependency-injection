import { IUserModule } from "./user.module.interface";
import { Inject, Injectable } from "./container";
import { IDeliverModule } from "./deliver.module.interface";
import { IOfficeModule } from "./office.module.interface";
import { UserModule } from "./user.module";
import { OfficeModule } from "./office.module";
import { InjectionToken } from "./token";

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

// export const DeliverModuleToken = new InjectionToken<IDeliverModule>(
//   "DeliverModule"
// );

@Injectable
export class DeliverModule implements IDeliverModule {
  constructor(
    @Inject(new InjectionToken("OfficeModule"))
    private _officeModule: IOfficeModule,
    @Inject(new InjectionToken("UserModule"))
    private _userModule: IUserModule
  ) {}

  userDrivingToOffice(): void {
    console.log("User driving to office");
    this._userModule.createUser("Dzung Dang");
    this._officeModule.userArrivedToOffice();
  }
}
