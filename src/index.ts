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

config();

const mongoDB: string = process.env.MONGODB_DEPLOY ?? 'mongodb://127.0.0.1:27017/waiter_app';
const AccessControlAllowOrigin: string = process.env.ACCESS_CONTROL_ALLOW_ORIGIN ?? 'http://localhost:5173';
const AccessControlAllowMethods: string = process.env.ACCESS_CONTROL_ALLOW_METHODS ?? 'http://localhost:5173';
const AccessControlAllowHeaders: string = process.env.ACCESS_CONTROL_ALLOW_HEADERS ?? 'http://localhost:5173';


mongoose.connect(mongoDB)
  .then(() => {

    io.on('connect', () => {
      console.log('conectou');
    });

    app.use((req, res, next) => {
      // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.setHeader('Access-Control-Allow-Origin', AccessControlAllowOrigin);
      res.setHeader('Access-Control-Allow-Methods', AccessControlAllowMethods);
      res.setHeader('Access-Control-Allow-Headers', AccessControlAllowHeaders);
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



