'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PORT = process.env.PORT || 3000;
const app = (0, _express2.default)();

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://gtfslab:marta1@ds259351.mlab.com:59351/gtfs-lab', { keepAlive: 120 }).then(() => console.log('mongo connection successful')).catch(err => console.error(err));

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
  res.setHeader('Last-Modified', Date.now().toString());
  next();
});

app.get('/', (req, res) => {
  res.status(200).send({ app: _package2.default.name });
});

app.get('/version', (req, res) => {
  res.status(200).send({ version: _package2.default.version });
});

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});

app.use('/static', _index2.default);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

exports.default = app;