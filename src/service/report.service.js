import db from '../models';
import CustomError from '../utils/CustomError';

export class ReportService {

    // 보고서 작성
    async createReport(reportInfo) {
        try {
            const { title, progress, issues, planned, note } = reportInfo;

            const newReport = await db.report.create({
                title,
                progress,
                issues,
                planned,
                note,
            });

            const data = {
                title: newReport.title,
                progress: newReport.progress,
                issues: newReport.issues,
                planned: newReport.planned,
                note: newReport.note,
            };

            return data;

        } catch (e) {
            console.error(`[ReportService][createReport] Error: ${e.message}`, e);
            throw e;
        }
    };
};