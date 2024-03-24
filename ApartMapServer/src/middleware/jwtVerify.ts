import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
require("dotenv").config();

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authToken =
    <string>req.headers.authorization || <string>req.headers.Authorization;

  if (!authToken) {
    console.log(authToken);
    return res.status(403).json({ error: "token in missing." });
  }
  const token = authToken.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("here?");
    if (err) return res.status(401).json({ err: "token in invalid" });

    req.body.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
