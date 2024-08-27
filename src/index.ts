import express from "express";

import { UserModule } from "./user.module";
import { DeliverModule } from "./deliver.module";
import { container } from "./container";
import { IDeliverModule } from "deliver.module.interface";
import { InjectionToken } from "./token";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");
  const deliverModule = container.getDependencyByCtr<IDeliverModule>(
    new InjectionToken<IDeliverModule>("DeliverModule")
  );
  console.log("[DEBUG][DzungDang] container:", container);
  console.log("[DEBUG][DzungDang] deliverModule:", deliverModule);
  deliverModule.userDrivingToOffice();
});
