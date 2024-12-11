import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import models from './models';

// 환경변수 로드
dotenv.config();

/* ===== 라우터 설정 ===== */
import userRouter from './routes';
import reportRouter from './routes';

const app = express();

/* ===== 뷰 엔진 설정 ===== */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* ===== 미들웨어 설정 ====== */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

/* ===== 세션 설정 ===== */
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false, // 요청마다 세션을 다시 저장하지 않음
  saveUninitialized: false, // 초기화되지 않은 세션은 저장하지 않음
  cookie: {
    httpOnly: true, // 클라이언트에서 JS로 접근 불가
    secure: false, // HTTPS에서만 전송 (개발 환경에서는 false)
    maxAge: 7 * 24 * 60 * 1000, // 7일
  },
}));

// 세션 및 쿠키 확인용 로그
app.use((req, res, next) => {
  console.log('🍪 Cookies:', req.cookies); // 🔥 쿠키 확인
  console.log('🛠️ Session:', req.session); // 🔥 세션 확인
  next();
});

/* ===== 시퀄라이즈 초기화 ===== */
// models.sequelize
//   .query('SET FOREIGN_KEY_CHECKS = 0')
//   .then(() => models.sequelize.sync({ force: true }))
//   .then(() => {
//     console.log('ㅇㅇ');
//   })
//   .catch((error) => {
//     console.log(error);
//   });

/* ===== 라우터 연결 ===== */
app.use('/', userRouter);
app.use('/', reportRouter);

/* ===== 에러 핸들링 ===== */
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;