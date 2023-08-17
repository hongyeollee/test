import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

import appDataSource from "./models/index.js";
import createApp from "./app.js";

// const startServer = async () => {
//   const app = createApp();
//   const PORT = process.env.PORT || 3000;

//   try {
//     // 데이터베이스 초기화 스크립트 실행
//     const initScript = fs.readFileSync("./db/schema.sql", "utf-8");

//     // 데이터베이스 초기화 스크립트 실행을 위해 데이터베이스 연결
//     await appDataSource.initialize();

//     // 데이터베이스 초기화 스크립트 실행
//     await appDataSource.query(initScript);

//     app.listen(PORT, () => {
//       console.log(`server is listen on port ${PORT}🟢`);
//     });
//   } catch (error) {
//     console.log(`failed connect server❌`);
//     console.error(error);
//     appDataSource.destroy();
//   }
// };

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  await appDataSource
    .initialize()
    .then(() => {
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
