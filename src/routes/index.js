import express from 'express';
import staticGTFSloadController from '../controller/staticGTFSloadController';
import staticGTFSfetchController from '../controller/staticGTFSfetchController';

const router = express.Router();

router.get('/load', (req, res) => {
  staticGTFSloadController(req, res);
});

router.get('/fetch', (req, res) => {
  staticGTFSfetchController(req, res);
});

module.exports = router;
