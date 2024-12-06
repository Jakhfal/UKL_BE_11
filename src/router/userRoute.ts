import { Router } from "express";
import { authentication, createUser, readUser, updateUser, deleteUser } from "../controller/userController";
import { verifytoken } from "../middleware/authorization";

import { createValidation, updateValidation, authValidation } from "../middleware/userValidation";
const router = Router();

router.post(`/auth/login`,[verifytoken, createValidation], createUser)
router.get(`/user`,[verifytoken],readUser)
router.put(`/:id`,[verifytoken,updateValidation],updateUser)
router.delete(`/user/:id`,[verifytoken],deleteUser)
router.post(`/auth`,authValidation,authentication)

export default router