import { IUserModule } from "./user.module.interface";
import { Inject, Injectable } from "./container";
import { IDeliverModule } from "./deliver.module.interface";
import { IOfficeModule } from "./office.module.interface";
import { UserModule } from "./user.module";
import { OfficeModule } from "./office.module";

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

@Injectable
export class DeliverModule implements IDeliverModule {
  constructor(
    @Inject private _officeModule: OfficeModule,
    @Inject private _userModule: IUserModule
  ) {}

  userDrivingToOffice(): void {
    console.log("User driving to office");
    this._officeModule.userArrivedToOffice();
  }
}
