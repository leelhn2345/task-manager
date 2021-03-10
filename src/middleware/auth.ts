import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header(`Authorization`)?.replace("Bearer ", "");
    if (!token) throw new Error();
    const decoded = <IDecoded>jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: `Please authenticate.` });
  }
};

interface IDecoded {
  _id: string;
  iat: number;
}

export { auth as default };
