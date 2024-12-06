import { NextFunction, Request, Response } from "express";
import { PrismaClient, userRole  } from "@prisma/client";
const prisma = new PrismaClient
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

type Role = "admin" | "user";

const createUser = async (req : Request, res : Response, next : NextFunction): Promise<void> => {
    try {
        const {username, password, userRole} = req.body;
        const findUser = await prisma.user.findFirst({where :{username}});

        if (findUser) {
            res.status(400).json({
                message : "Username telah digunakan"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newusers = await prisma.user.create({
            data : {
                username : username,
                password : hashPassword,
                userRole : userRole
            }
        })  

        res.status(201).json({
            status : "success",
            message : "Login Berhasil",
            data: newusers
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const readUser = async (req : Request, res : Response, next : NextFunction): Promise<any> => {
    try {
        const search = req.query.search;
        const users = await prisma.user.findMany({
            where : {
                OR : [
                    {
                        username : {
                            contains : search?.toString() || ``
                        }
                    }
                ]
            }
        })

        return res.status(200).json({
            status : "success",
            message : "Data User Berhasil Ditemukan",
            data : users
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateUser = async (req : Request, res : Response, next : NextFunction): Promise<any> => {
    try {
        const id = req.params.id;
        const findUser = await prisma.user.findFirst({
            where : {id: Number(id)}
        })
        const { username, password } = req.body;
        const users = await prisma.user.update({
            where: {id : Number(id)},
            data : {
                username : username ? username : findUser?.username,
                password : password ? password : findUser?.password,    
            }
        })

        return res.status(200).json({
            message: "Data User Berhasil Diupdate",
            data: users
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteUser = async (req : Request, res : Response, next : NextFunction): Promise<any> => {
    try {
        const id = req.params.id;
        await prisma.user.delete({
            where: { id: Number(id) }
        })
        return res.status(200).json({
            message : "Data User Berhasil Dihapus"
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

const authentication = async (req : Request, res : Response, next : NextFunction): Promise<any> => {
    try {
        const {username, password, userRole} = req.body;
        const findUser = await prisma.user.findFirst({
            where: {username: username}
        })

        if (!findUser) {
            return res.status(401).json({
                message: "Username atau Password Salah",
            })
        }

        const ismatchpassword = await bcrypt.compare(password, findUser.password);
        if (!ismatchpassword) {
            return res.status(401).json({
                message: "Password Salah",
            })
        }


        const payload = {
            username: findUser?.username,
            password: findUser?.password,
            userRole: findUser?.userRole
        }
        const signature = process.env.SECRET || "";
        const token = jwt.sign(payload, signature);
        return res.status(200).json({
            status : "success",
            message : "Login Berhasil",
            token,
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

export {createUser, readUser, updateUser, deleteUser, authentication}