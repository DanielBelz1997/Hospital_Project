import express from "express";
const router = express.Router();
import { getMembers } from "../controllers/members";

router.get("/", getMembers);

// hello
module.exports = router;
