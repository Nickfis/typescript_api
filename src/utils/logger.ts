import pino from "pino";
import pretty from "pino-pretty";

const logger = pino(
  pretty({
    colorize: true,
    ignore: "pid",
  })
);

export default logger;
