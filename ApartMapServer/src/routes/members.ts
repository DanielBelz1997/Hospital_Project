import express from "express";
const router = express.Router();
import { getMembers, getMembersDetails } from "../controllers/members";

router.get("/", getMembers);

router.get("/Details", getMembersDetails);

module.exports = router;
