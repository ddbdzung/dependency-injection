import type { IOfficeModule } from "./office.module.interface";

import { Injectable } from "./decorator";
import { InjectionToken } from "./token";

@Injectable
export class OfficeModule implements IOfficeModule {
  constructor(location?: string, employeeQty?: null | undefined) {}

  public userArrivedToOffice(): void {
    console.log("User arrived to office");
  }
}

export const officeModuleToken = new InjectionToken("OfficeModule").bindTo(
  OfficeModule
);
