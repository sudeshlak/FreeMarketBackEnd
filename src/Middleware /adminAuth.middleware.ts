import {Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { getUserByEmail } from "../services/user.service";
const User = require('../models/users');

export async function adminAuth(
    req:Request,
    res:Response,
    next:NextFunction){
        const token = req.headers?.authorization || '';
        if (!token) {
            return res.status(200).json({ message: 'Authorization token required' });
        }
        try{
            //Find and verify user
            const payload =<{
                data:string,
                iat:number
            }> jwt.verify(token,<string>process.env.auth_encryption_salt);
            const email = payload['data'];
            const user = await getUserByEmail( email );
            if (user.type !== 'admin') {
                return res.status(403).json({ error: 'Admin access required' });
            }
 
            // 5. Attach user to request for use in handlers
            (req as any).user = user;
            next();
        }catch(error){
            console.log(error);
            return res.status(402).json({ message: 'Invalid token' });
        }
}