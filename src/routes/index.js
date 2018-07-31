import express from 'express';
import staticGTFSloadController from '../controller/staticGTFSloadController';
import datasetCountController from '../controller/datasetCountController';
import geoCenterController from '../controller/geoCenterController';
import agencyListController from '../controller/agencyListController';
import weekendController from '../controller/weekendController';
import transportTypeController from '../controller/transportTypeController';

const router = express.Router();

router.get('/load', (req, res) => {
  staticGTFSloadController(req, res);
});

router.get('/fetch/count', (req, res) => {
  datasetCountController(req, res);
});

router.get('/fetch/geo', (req, res) => {
  geoCenterController(req, res);
});

router.get('/fetch/agencies', (req, res) => {
  agencyListController(req, res);
});

router.get('/fetch/weekend', (req, res) => {
  weekendController(req, res);
});

router.get('/fetch/transport/types', (req, res) => {
  transportTypeController(req, res);
});

module.exports = router;
