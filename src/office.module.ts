import { Injectable } from "./container";

@Injectable
export class OfficeModule {
  constructor(location?: string) {}

  public userArrivedToOffice(): void {
    console.log("User arrived to office");
  }
}
