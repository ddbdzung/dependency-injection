import { InjectionToken } from "./token";
import { Injectable } from "./container";
import { IOfficeModule } from "office.module.interface";

// export const OfficeModuleToken = new InjectionToken<IOfficeModule>(
//   "OfficeModule"
// );

@Injectable
export class OfficeModule implements IOfficeModule {
  constructor(location?: string, employeeQty?: number) {}

  public userArrivedToOffice(): void {
    console.log("User arrived to office");
  }
}
