import { ReportService } from '../service/report.service';
import CustomError from '../utils/CustomError';

// 보고서 작성
export const createReport = async (req, res) => {
    try {
        const reportService = new ReportService();
        const data = await reportService.createReport(req.body);

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: data,
        });
    } catch (e) {
        console.error(`[ReportController][createReport] ${e.message}`, e);

        return res.status(e.status || 500).json({
            status: e.message || 500,
            message: e.message || 'server error',
        });
    }
};