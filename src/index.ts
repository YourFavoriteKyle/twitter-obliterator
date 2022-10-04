import { getUserIdByUsername } from "./user";
import { getUserTweets } from "./timeline";
import * as fs from "fs";

const dotenv = require("dotenv");
const needle = require("needle");
dotenv.config();

const token = <string>process.env.TWITTER_BEARER_TOKEN;
const userName = "YourFavoritKyle";

(async () => {
  try {
    // Make request
    const user = await getUserIdByUsername(token, needle, userName);
    const response = await getUserTweets(token, needle, user[0].id);

    console.dir(response, {
      depth: null,
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();
