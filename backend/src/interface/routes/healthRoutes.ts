import { Router } from 'express';
import { getHealth } from '../controller/healthController.js';

export const healthRouter = Router();

healthRouter.get('/', getHealth);
