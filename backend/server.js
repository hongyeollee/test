import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

import appDataSource from "./models/index.js";
import createApp from "./app.js";

const truncateTable = async (table) => {
  try {
    await appDataSource.query(`DELETE FROM ${table}`);
    console.log(`Table ${table} deleted`);
  } catch (err) {
    console.error(`Failed to delete table ${table}`);
    console.error(err);
  }
};

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  await appDataSource
    .initialize()
    .then(async () => {
      // await truncateTable("cust_detail");
      // await truncateTable("cust");

      app.listen(PORT, () => {
        console.log(`server is listen on port ${PORT}🟢`);
      });
    })
    .catch((err) => {
      console.log(`failed connect server❌`);
      console.error(err);
      appDataSource.destroy();
    });
};

startServer();
