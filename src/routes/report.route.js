import express from 'express';
import { createReport } from '../controllers/report.controller';

const router = express.Router();

/* ===== GET ===== */

/* ===== POST ===== */
router.post('/create', createReport);

export default router;