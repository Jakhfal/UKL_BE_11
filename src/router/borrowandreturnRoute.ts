import { Router } from "express";
// import { createBorrow, returnBorrow} from "../controller/borrowandreturnController";
import { createBorrow, returnItem, analyzeUsage, analyzeItemUsage } from "../controller/borrowandreturnController";
import { createValidation, returnValidation, usageValidation } from "../middleware/borrowValidation";
import { verifytoken } from "../middleware/authorization";


const router = Router();

router.post(`/inventory/borrow`,[verifytoken, createValidation] ,createBorrow)
router.post("/inventory/return", [verifytoken, returnValidation], returnItem);
router.post(`/inventory/usage-report`, [verifytoken, usageValidation], analyzeUsage)
router.post(`/inventory/borrow-analysis`, [verifytoken], analyzeItemUsage);


export default router