import { UserService } from '../service/user.service';
import CustomError from '../utils/CustomError';

// 회원 전체 조회
export const getUsers = async (req, res) => {
    try {
        const userService = new UserService();
        const data = await userService.getUsers();

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: data,
        });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: 'server error',
            data: e.message,
        });
    }
};

// 회원 단일 조회
export const getOneUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        const userService = new UserService();
        const data = await userService.getOneUser(user_id);

        if (!data) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: data,
        });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: 'server error',
            data: e.message,
        });
    }
};

// 회원 가입
export const signUp = async (req, res) => {
    try {
        const userService = new UserService();
        const data = await userService.signUp(req.body);

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: data,
        });
    } catch (e) {
        console.error(`[UserController][signup] ${e.message}`, e);

        return res.status(e.status || 500).json({
            status: e.status || 500,
            message: e.message || 'server error',
        });
    }
};

// 로그인
export const signIn = async (req, res) => {
    try {
        const userService = new UserService();
        const data = await userService.signIn(req.body);

        req.session.user = {
            user_id: data.user_id,
            id: data.id,
            name: data.name,
            role: data.role,
        };

        req.session.save(() => {
            res.status(200).json({
                status: 200,
                message: '로그인 성공',
                data: data,
            });
        });

    } catch (e) {
        console.error(`[UserController][signIn] ${e.message}`, e);

        if (e instanceof CustomError) {
            return res.status(e.status).json({
                status: e.status,
                message: e.message,
            });
        }

        // 서버 에러 (500)
        return res.status(500).json({
            status: 500,
            message: 'server error',
            data: e.message,
        });
    }
};

export const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: '로그아웃 실패',
                });
            }
            res.clearCookie('connect.sid');
            return res.status(200).json({
                status: 200,
                message: '로그아웃 성공',
            });
        });
    } catch (e) {
        console.error(`[UserController][logout] ${e.message}`, e);

        return res.status(500).json({
            status: 500,
            message: 'server error',
            data: e.message,
        });
    }
};