import express from "express";

import { UserModule } from "./user.module";
import { DeliverModule } from "./deliver.module";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3006, () => {
  console.log("Server is running on port 3006");

  DeliverModule.userDrivingToOffice();
});
