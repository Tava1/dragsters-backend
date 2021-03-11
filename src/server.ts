import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import routes from './routes';

import './database';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(errors());

app.listen(3333, () => {
  console.log('🏁️ Servers is now running in http://localhost:3333/');
});
