import express from "express";
import { getOneUser, getUsers, logout, signIn, signUp } from '../controllers/user.controller';

const router = express.Router();

/* ===== GET ===== */
router.get('/', getUsers);
router.get('/:id', getOneUser);

/* ===== POST ===== */
router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/logout', logout);

export default router;