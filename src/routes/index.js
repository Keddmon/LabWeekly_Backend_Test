import { Router } from 'express';
import UserRouter from './user.route';
import ReportRouter from './report.route';

const router = Router();

router.use('/user', UserRouter);
router.use('/report', ReportRouter);

export default router;