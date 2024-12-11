import db from '../models';
import CustomError from '../utils/CustomError';

export class UserService {

    // 회원 전체 조회
    async getUsers() {
        try {
            const data = await db.user.findAll();

            return data;
        } catch (e) {
            console.log(`[UserService][getUsers] Error: ${e.message}`);
        }
    };

    // 회원 단일 조회
    async getOneUser(user_id) {
        try {
            const data = await db.user.findOne({
                where: { user_id },
            });

            return data;
        } catch (e) {
            console.log(`[UserService][getOneUser] Error: ${e.message}`);
        }
    };

    // 로그인
    async signIn(userInfo) {
        try {
            const { id, password } = userInfo;

            // 아이디가 존재하는지 확인
            const user = await db.user.findOne({
                where: { id },
            });

            // 아이디가 존재하지 않으면 에러
            if (!user) {
                throw new CustomError(401, '존재하지 않는 아이디입니다.');
            }

            // 비밀번호가 틀리면 에러
            if (user.password !== password) {
                throw new CustomError(401, '비밀번호가 일치하지 않습니다.');
            }

            // 넘겨줄 데이터를 정함 (id, name 말고도 다른 데이터 추가 가능)
            const data = {
                user_id: user.user_id,
                id: user.id,
                name: user.name,
                role: user.role,
            };

            return data;

        } catch (e) {
            console.log(`[UserService][signIn] Error: ${e.message}`);
            throw e;
        }
    };

    // 회원가입
    async signUp(userInfo) {
        try {
            const { id, password, name } = userInfo;

            const existingUser = await db.user.findOne({
                where: { id },
            });

            if (existingUser) {
                throw new CustomError(401, '이미 존재하는 아이디입니다.');
            }

            const newUser = await db.user.create({
                id,
                password,
                name,
            });

            const data = {
                user_id: newUser.user_id,
                id: newUser.id,
                name: newUser.name,
                role: newUser.role,
            };

            return data;

        } catch (e) {
            console.log(`[UserService][signUp] Error: ${e.message}`);
            throw e;
        }
    };
};