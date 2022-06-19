import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    logger.info("DB Connected!");
  } catch (err) {
    logger.error("Error connecting to the db", err);
    process.exit(1);
  }
};

export default connect;
