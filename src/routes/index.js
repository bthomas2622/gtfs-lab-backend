import express from 'express';
import staticGTFSloadController from '../controller/staticGTFSloadController';
import { staticGTFScountController, staticGTFSgeoCenterController } from '../controller/staticGTFSfetchController';

const router = express.Router();

router.get('/load', (req, res) => {
  staticGTFSloadController(req, res);
});

router.get('/fetch/count', (req, res) => {
  staticGTFScountController(req, res);
});

router.get('/fetch/geo', (req, res) => {
  staticGTFSgeoCenterController(req, res);
});

module.exports = router;
