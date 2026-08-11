import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
export const errfunction = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === "23505"
  ) {
    return res
      .status(409)
      .json({ error: "A record with this value already exists" });
  }
  console.error(err); //for unexpected error
  res.status(500).json({ error: "Something went wrong" }); //default error
};
