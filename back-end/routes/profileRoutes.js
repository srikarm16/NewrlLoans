/* eslint-disable */

import express from "express";
import {
    createProfile,
} from "../controllers/loanController.js";
const router = express.Router();

router.post("/create-profile", requestLoan);

export default router;