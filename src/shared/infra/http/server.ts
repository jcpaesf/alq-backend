import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import '@shared/infra/typeorm';
import '@shared/container';
import socketChatConnect from './socketChat/index';

const app = express();

app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
    console.log(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});

const listen = app.listen(3333, () => {
    console.log('Server started on port 3333...');
});

socketChatConnect(listen);