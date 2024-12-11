import express from 'express';
import { createReport, getReports, getUserReports } from '../controllers/report.controller';

const router = express.Router();

/* ===== GET ===== */
router.get('/', getReports);
router.get('/user', getUserReports);

/* ===== POST ===== */
router.post('/create', createReport);

export default router;