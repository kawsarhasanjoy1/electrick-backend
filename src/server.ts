import { app } from "./app";
import mongoose from "mongoose";
import config from "./app/config/config";
import cronDeleted from "./app/utils/cronDeleted";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      cronDeleted();
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
