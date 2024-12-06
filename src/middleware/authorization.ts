import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

const verifytoken = async (req : Request, res : Response, next : NextFunction): Promise<any> => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).json({
                message : "Token Tidak Ditemukan"
            })
        }
        const [type, token] = header ? header.split(" ") : [];
        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                message : "Token Tidak Valid"
            })
        }

        const signature = process.env.SECRET || ""
        const isVerified = jwt.verify(token, signature, (err,decode) => {
            if (err) return res.status(401).json({message : "Token Tidak Valid"});

            const token = decode as jwt.JwtPayload

            if (token.userRole !== "admin") {
                return res.status(401).json({
                    message : "Anda Tidak Memiliki Akses"
                })
            }

            next();

        });

    } catch (error) {
        return res.status(500).json(error);
    }
}

export {verifytoken}