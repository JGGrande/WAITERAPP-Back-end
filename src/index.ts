import express from 'express';
import http from 'node:http';
import mongoose from 'mongoose';
import path from 'node:path';
import { Server } from 'socket.io';

import { router } from './router';
const app = express();
import { config } from 'dotenv';
const server = http.createServer(app);
export const io = new Server(server);

// const MONGO_URL: string | undefined = process.env;

config();

const mongoDB: string = process.env.MONGODB_DEPLOY ?? 'mongodb://127.0.0.1:27017/waiter_app';

mongoose.connect(mongoDB)
  .then(() => {

    io.on('connect', () => {
      console.log('conectou');
    });

    app.use((req, res, next) => {
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen(3001, () => {
      console.log('Server is runing: http://localhost:3001');
    });
  })
  .catch(() => console.log('erro ao conectar ao banco'));



