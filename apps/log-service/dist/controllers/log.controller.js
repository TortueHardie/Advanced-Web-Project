"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogController = void 0;
const winston_1 = __importDefault(require("winston"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Configuration du logger
const logDir = path_1.default.join(__dirname, '../../logs');
// Créer le répertoire de logs s'il n'existe pas
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir, { recursive: true });
}
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, 'error.log'), level: 'error' }),
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, 'combined.log') }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        })
    ]
});
class LogController {
    /**
     * @swagger
     * /health:
     *   get:
     *     summary: Vérifier l'état du service
     *     description: Renvoie l'état du service de logs
     *     responses:
     *       200:
     *         description: État OK
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: ok
     *                 service:
     *                   type: string
     *                   example: logging-service
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     */
    healthCheck(req, res) {
        res.status(200).json({
            status: 'ok',
            service: 'logging-service',
            timestamp: new Date().toISOString()
        });
    }
    /**
     * @swagger
     * /logs:
     *   post:
     *     summary: Enregistrer un nouveau log
     *     description: Ajoute un nouveau message de log au système
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - message
     *             properties:
     *               message:
     *                 type: string
     *                 description: Le message de log
     *               level:
     *                 type: string
     *                 enum: [info, warn, error, debug]
     *                 default: info
     *                 description: Le niveau de log
     *               metadata:
     *                 type: object
     *                 description: Métadonnées additionnelles
     *     responses:
     *       201:
     *         description: Log enregistré avec succès
     *       400:
     *         description: Message manquant
     */
    storeLog(req, res) {
        const { message, level = 'info', metadata = {} } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        logger.log(level, message, metadata);
        return res.status(201).json({
            status: 'success',
            message: 'Log stored successfully'
        });
    }
    /**
     * @swagger
     * /logs:
     *   get:
     *     summary: Récupérer les logs
     *     description: Récupère une liste paginée des logs
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           default: 1
     *         description: Numéro de page à récupérer
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 10
     *         description: Nombre de logs par page
     *     responses:
     *       200:
     *         description: Liste des logs
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 page:
     *                   type: integer
     *                 limit:
     *                   type: integer
     *                 logs:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       timestamp:
     *                         type: string
     *                         format: date-time
     *                       level:
     *                         type: string
     *                       message:
     *                         type: string
     *                       metadata:
     *                         type: object
     *                 total:
     *                   type: integer
     */
    getLogs(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // Simulation de pagination - dans une implémentation réelle, 
        // nous lirions les fichiers de logs ou une base de données
        res.status(200).json({
            page,
            limit,
            logs: [
                { timestamp: new Date().toISOString(), level: 'info', message: 'Sample log entry', metadata: {} }
            ],
            total: 1
        });
    }
}
exports.LogController = LogController;
