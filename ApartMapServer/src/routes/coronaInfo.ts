import express from "express";
const router = express.Router();
import { lastMonthData } from "../controllers/coronaInfo";

router.get("/", lastMonthData);

// hello
module.exports = router;
