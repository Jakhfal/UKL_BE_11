import { Router } from "express";
import { createInventory, readInventory, updateInventory, deleteInventory } from "../controller/inventory";
import { verifytoken } from "../middleware/authorization";
import { createValidation, updateValidation} from "../middleware/inventoryValidation";
const router = Router();

router.post(`/inventory`,[verifytoken,createValidation], createInventory)
router.get(`/inventory/:id`,readInventory)
router.put(`/inventory/:id`,[verifytoken,updateValidation],updateInventory)
router.delete(`/:id`,[verifytoken],deleteInventory)


export default router