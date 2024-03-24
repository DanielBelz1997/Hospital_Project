import express from "express";
const router = express.Router();
import { getHomePage } from "../controllers/points";

router.get("/points", getHomePage);
// hello
module.exports = router;


