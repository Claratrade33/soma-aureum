import { body } from 'express-validator';
import express from 'express';
import aportController from '../controllers/aportController';
import validate from '../middlewares/validate';

const router = express.Router();

router.post(
  '/',
  validate({
    body: [
      body('username').isString().notEmpty(),
      body('aporte').isFloat({ gt: 0 })
    ]
  }),
  aportController.createAport
);

export default router;
