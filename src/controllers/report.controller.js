import { ReportService } from '../service/report.service';
import CustomError from '../utils/CustomError';

// 보고서 전체조회
export const getReports = async (req, res) => {
    try {
        const reportService = new ReportService();

        const data = await reportService.getReports();

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: data,
        });
    } catch (e) {
        console.error(`[ReportController][getReports] ${e.message}`, e);

        return res.status(e.status || 500).json({
            status: e.status || 500,
            message: e.message || 'server error',
        });
    }
};

// 회원이 작성한 보고서 조회
export const getUserReports = async (req,res) => {
    try {
        const user_id = req.session.user.user_id;
        const reportService = new ReportService();
        const data = await reportService.getUserReports(user_id);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: 'User not found.',
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: Array.isArray(data) ? data : [data],
        });
    } catch (e) {
        console.error(`[ReportController][getUserReports] ${e.message}`, e);

        return res.status(e.status || 500).json({
            status: e.status || 500,
            message: e.message || 'server error',
        });
    }
};

// 보고서 작성
export const createReport = async (req, res) => {
    try {
        const reportService = new ReportService();

        const user_id = req.session.user?.user_id;
        console.log(user_id);

        if (!user_id) {
            throw new CustomError(401, '로그인 하셈');
        }

        const reportInfo = {
            ...req.body,
            user_id,
        };

        const data = await reportService.createReport(reportInfo);

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