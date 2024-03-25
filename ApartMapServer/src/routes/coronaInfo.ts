import express from "express";
const router = express.Router();
import { coronaInfo } from "../controllers/coronaInfo";

router.get("/", coronaInfo);

// hello
module.exports = router;
