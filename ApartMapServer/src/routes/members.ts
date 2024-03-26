import express from "express";
const router = express.Router();
import {
  getMembersDetails,
  addMember,
  deleteMember,
} from "../controllers/members";

router.get("/", getMembersDetails);

router.post("/", addMember);

router.delete("/:memberId", deleteMember);

module.exports = router;
