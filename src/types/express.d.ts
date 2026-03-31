import "express";
import type { IRequestUser } from "./interfaces";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: IRequestUser;
    }
  }
}

export { };

