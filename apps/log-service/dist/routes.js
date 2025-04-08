"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const log_controller_1 = require("./controllers/log.controller");
const router = (0, express_1.Router)();
const logController = new log_controller_1.LogController();
// Routes
router.get('/health', (req, res) => logController.healthCheck(req, res));
router.post('/logs', (req, res) => logController.storeLog(req, res));
router.get('/logs', (req, res) => logController.getLogs(req, res));
exports.default = router;
