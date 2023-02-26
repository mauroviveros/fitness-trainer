const fs      = require("fs");
const path    = require("path");
const dotenv  = require("dotenv");
dotenv.config();

const targetPath = "./src/environments/environment.ts";
const environment = {
  FIREBASE: {
    PROJECT_ID          : process.env["FIREBASE_PROJECT_ID"],
    APP_ID              : process.env["FIREBASE_APP_ID"],
    DATABASE_URL        : process.env["FIREBASE_DATABASE_URL"],
    STORAGE_BUCKET      : process.env["FIREBASE_STORAGE_BUCKET"],
    API_KEY             : process.env["FIREBASE_API_KEY"],
    AUTH_DOMAIN         : process.env["FIREBASE_AUTH_DOMAIN"],
    MESSAGING_SENDER_ID : process.env["FIREBASE_MESSAGING_SENDER_ID"],
    MEASUREMENT_ID      : process.env["FIREBASE_MEASUREMENT_ID"]
  }
};

const content = `export const environment = ${JSON.stringify(environment, null, 2)};`;


const main = async () => {
  try {
    await fs.mkdirSync(path.parse(targetPath).dir, { recursive: true });
    await fs.writeFileSync(targetPath, content);

    console.log(await fs.readFileSync(targetPath, "utf8"));
    console.log(await fs.readFileSync("./.env", "utf8"));
  } catch (error) {
    throw error;
  };
};

main();