import express from 'express';
import staticGTFSloadController from '../controller/staticGTFSloadController';

const router = express.Router();

router.get('/', (req, res) => {
  staticGTFSloadController(req, res);
});

module.exports = router;
