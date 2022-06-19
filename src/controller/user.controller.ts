import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { CreateUserInput } from "../schema/user.schema";
import bcrypt from "bcrypt";
import config from "config";
import { omit } from "lodash";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    console.log("Running through create user handler");
    const { body } = req;
    if (body.password !== body.passwordConfirmation) {
      return res.status(403).json({ message: "Passwords don't match." });
    }
    const passwordSalt = await bcrypt.genSalt(
      config.get<number>("saltWorkFactor")
    );
    const passwordHashed = bcrypt.hashSync(body.password, passwordSalt);
    const user = await createUser({ ...body, password: passwordHashed });
    return res.send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
