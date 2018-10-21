import express from 'express';
import * as bodyParser from 'body-parser';
import { registerRoutes } from './routes';
import client from './services/discordClient';
import config from './config.json';

const app = express();

const port: number = parseInt(process.env.PORT) || 3000;

client.login(config.token)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

registerRoutes(app);

app.listen(port);

console.log(`Server started on: ${port}`);
