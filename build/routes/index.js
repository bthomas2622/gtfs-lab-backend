'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _staticGTFSloadController = require('../controller/staticGTFSloadController');

var _staticGTFSloadController2 = _interopRequireDefault(_staticGTFSloadController);

var _datasetCountController = require('../controller/datasetCountController');

var _datasetCountController2 = _interopRequireDefault(_datasetCountController);

var _geoCenterController = require('../controller/geoCenterController');

var _geoCenterController2 = _interopRequireDefault(_geoCenterController);

var _agencyListController = require('../controller/agencyListController');

var _agencyListController2 = _interopRequireDefault(_agencyListController);

var _weekendController = require('../controller/weekendController');

var _weekendController2 = _interopRequireDefault(_weekendController);

var _transportTypeController = require('../controller/transportTypeController');

var _transportTypeController2 = _interopRequireDefault(_transportTypeController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/load', (req, res) => {
  (0, _staticGTFSloadController2.default)(req, res);
});

router.get('/fetch/count', (req, res) => {
  (0, _datasetCountController2.default)(req, res);
});

router.get('/fetch/geo', (req, res) => {
  (0, _geoCenterController2.default)(req, res);
});

router.get('/fetch/agencies', (req, res) => {
  (0, _agencyListController2.default)(req, res);
});

router.get('/fetch/weekend', (req, res) => {
  (0, _weekendController2.default)(req, res);
});

router.get('/fetch/transport/types', (req, res) => {
  (0, _transportTypeController2.default)(req, res);
});

module.exports = router;