import express from 'express';
import staticGTFSloadController from '../controller/staticGTFSloadController';
import staticGTFScountController from '../controller/staticGTFScountController';

const router = express.Router();

router.get('/load', (req, res) => {
  staticGTFSloadController(req, res);
});

router.get('/fetch/count', (req, res) => {
  staticGTFScountController(req, res);
});

module.exports = router;
