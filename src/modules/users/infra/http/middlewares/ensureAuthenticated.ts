import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import jwtConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Usuário não está autenticado', 401);
    }

    if (!jwtConfig.jwt.secret) {
        throw new AppError('JWT não definido', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, jwtConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub
        }

        return next();
    } catch (e) {
        throw new AppError('Usuário não está autenticado', 401);
    }
}