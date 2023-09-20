import express from "express";
import { CLOSE_DB, CONNECT_DB, GET_DB } from "./config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "./config/environtment";

const START_SERVER = () => {
  const app = express();

  app.get("/", async (req, res) => {
    // console.log(await GET_DB().listCollections().toArray());
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `3. Hello Dev, I am running at http://${env.APP_HOST}:${env.APP_PORT}/ ...`
    );
  });

  //exit hook asynchronously
  //khi app dừng thì bắt sự kiện tắt app với exit hooks
  exitHook(() => {
    // console.log(`exiting with signal: ${signal}`);
    console.log("4. server is shutting down ...");
    CLOSE_DB();
    console.log("5. disconnected from server ...");
  });
};

(async () => {
  try {
    console.log("1. connecting to server database ...");
    await CONNECT_DB();
    console.log("2. connected mongodb server ...");
    START_SERVER();
  } catch (error) {
    console.error(err), process.exit(0);
  }
})();

// CONNECT_DB()
//   .then(() => console.log("2. connected mongodb server ..."))
//   .then(() => START_SERVER())
//   .catch((err) => {
//     console.error(err), process.exit(0);
//   });
