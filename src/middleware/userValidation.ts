import { error } from "console";
import { promises } from "dns";
import { Request, Response, NextFunction } from "express";
import Joi, { valid } from "joi";
import fs from "fs"
import path from "path"
import { userRole } from "@prisma/client";


const createScheme = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    userRole: Joi.string().valid(userRole.admin).required()
}) 


const createValidation = (req: Request, res: Response, next: NextFunction): any => {
    const validate =createScheme.validate(req.body)
    if (validate.error) {
        return res.status(400).json({
            message: validate.error.details.map(item => item.message).join()
        })
    }
    
    next()
}

const updateScheme = Joi.object({

    username: Joi.string().optional(),
    password: Joi.string().optional(),
    
})

const updateValidation = (req: Request, res: Response, next: NextFunction): any => {
    const validate = updateScheme.validate(req.body)

    if (validate.error) {
        
        return res.status(400).json({
            message: validate.error.details.map(item => item.message).join()
        })
    }
    next()
}
const authScheme = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})

const authValidation = (req: Request, res:Response,next:NextFunction): any => {
    const validate = authScheme.validate(req.body)
    if (validate.error) {
        return res.status(400).json({
            message: validate.error.details.map(item => item.message).join()
        })
    }
    next()
}

export {createValidation, updateValidation, authValidation}