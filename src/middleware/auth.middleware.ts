import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface token {
    userId: string;
}

export class AuthMiddleware {
    public verifyToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            res.status(403).json({ message: 'No se encontro ningun token' });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(403).json({ message: 'Token invalido' });
            return;
        }

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET!) as token;
            req.headers['userId'] = data.userId;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Desautorizado' });
        }
    }
}