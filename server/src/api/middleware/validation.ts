import { Request, Response, NextFunction } from "express";

export function validatePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const passwordRegex = /^(?=.*\d).+$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ error: "Password must contain at least one digit" });
  }

  next();
}

export function validateUsername(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(username)) {
    return res
      .status(400)
      .json({ error: "Username must contain only alphanumeric characters" });
  }

  next();
}
