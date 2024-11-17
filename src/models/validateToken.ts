import { Request, Response, NextFunction } from "express";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  //const token = req.headers["authorization"];
  next();
  /*
  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  if (token === "valid-token") {
    next();
  } else {
    return res.status(403).json({ error: "Invalid token." });
  }*/
};

export default validateToken;
