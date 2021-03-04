import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';

import pkg from '../package.json';
import routes from './routes/index';

const PORT = process.env.PORT || 3000;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://gtfslab:marta1@gtfs-lab.i9xjm.mongodb.net/gtfs-lab', { keepAlive: 120, useNewUrlParser: true })
  .then(() => console.log('mongo connection successful'))
  .catch(err => console.error(err));

mongoose.set('useCreateIndex', true);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  res.setHeader('Last-Modified', (Date.now()).toString());
  next();
});

app.get('/', (req, res) => {
  res.status(200).send({ app: pkg.name });
});

app.get('/version', (req, res) => {
  res.status(200).send({ version: pkg.version });
});

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

app.use('/static', routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

export default app;
