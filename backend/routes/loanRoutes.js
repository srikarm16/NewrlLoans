import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    requestLoan,
    getRequests,
    lendAccept,
    fetchBalance
} from "../controllers/loanController.js";
const router = express.Router();

router.post("/request-loan", protect, requestLoan);
router.get("/borrow-requests", protect, getRequests);
router.post("/lend-accept", protect, lendAccept);
router.get("/fetch-balance", protect, fetchBalance);

export default router;
