import { Router } from 'express';
import { LogController } from './controllers/log.controller';

const router = Router();
const logController = new LogController();

// Routes
router.get('/health', (req, res) => logController.healthCheck(req, res));
router.post('/logs', (req, res) => logController.storeLog(req, res));
router.get('/logs', (req, res) => logController.getLogs(req, res));

export default router; 