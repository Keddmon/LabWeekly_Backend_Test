import db from '../models';
import CustomError from '../utils/CustomError';

export class ReportService {

    // 보고서 전체 조회
    async getReports() {
        try {
            const data = await db.report.findAll({
                include: [
                    {
                        model: db.user,
                        attributes: ['name'],
                    },
                ],
            });

            return data;
        } catch (e) {
            console.error(`[ReportService][getReports] Error: ${e.message}`, e);
        }
    };

    // 회원 보고서 조회
    async getUserReports(user_id) {
        try {
            const user = await db.user.findOne({
                where: { user_id },
            });

            if (!user) {
                throw new CustomError(401, '존재하지 않는 아이디');
            }

            const data = await db.report.findAll({
                where: { user_id },
                include: [
                    {
                        model: db.user,
                        attributes: ['name'],
                    },
                ],
            });

            return data;
        } catch (e) {
            console.error(`[ReportService][getUserReports] ${e.message}`, e);
            throw e;
        }
    };

    // 보고서 작성
    async createReport(reportInfo) {
        try {
            const { title, progress, issues, planned, note, user_id } = reportInfo;

            const newReport = await db.report.create({
                title,
                progress,
                issues,
                planned,
                note,
                user_id,
            });

            const data = {
                title: newReport.title,
                progress: newReport.progress,
                issues: newReport.issues,
                planned: newReport.planned,
                note: newReport.note,
                user_id: newReport.user_id,
            };

            return data;

        } catch (e) {
            console.error(`[ReportService][createReport] Error: ${e.message}`, e);
            throw e;
        }
    };
};