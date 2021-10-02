// Import Express
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from 'helmet';
import { jwtAuthenticationMiddleware } from './lib/jwt.js';

const app = express();
dotenv.config();

/** Mongose database connection */
import "./database/database.js";

/** Routes */
import ApiRoutes from './routes/api.js';
/** Pusher Library */


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(jwtAuthenticationMiddleware);

const port = process.env.SERVER_PORT || 9000;



app.use('/api', ApiRoutes);

app.listen(port, () => console.log(`Listening on localhost:${port}`));