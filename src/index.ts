import express from "express";

import type { IDeliverModule } from "./deliver.module.interface";
import type { IUserModule } from "./user.module.interface";
import type { IOfficeModule } from "./office.module.interface";

import { getCentralizedStorage } from "./initial-module";
import { container } from "./container";
import { InjectionToken } from "./token";
import { UserModule, userModuleToken } from "./user.module";
import { DeliverModule, deliverModuleToken } from "./deliver.module";
import { OfficeModule, officeModuleToken } from "./office.module";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");

  const deliverModule = container.construct<IDeliverModule>(
    DeliverModule,
    deliverModuleToken
  ); // Entry module
  container.construct<IUserModule>(UserModule, userModuleToken);
  container.construct<IOfficeModule>(OfficeModule, officeModuleToken);
  console.log("[DEBUG][DzungDang] container:", container);
  console.log("[DEBUG][DzungDang] deliverModule:", deliverModule);
  console.log(
    "[DEBUG][DzungDang] centralizedStorage:",
    getCentralizedStorage()
  );
  deliverModule.userDrivingToOffice();
});
