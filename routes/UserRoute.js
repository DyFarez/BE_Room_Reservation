const express = require('express');
const { loginUser, logoutUser, registerUser, isLogin, userLogin } = require('../controllers/UserController')

const userRouter = express.Router()

userRouter.post('/api/user/login', loginUser);
userRouter.post('/api/user/register', registerUser);
userRouter.post('/api/user/logout', logoutUser);
userRouter.get('/api/user/isLogin', isLogin);
userRouter.get('/api/user/user', userLogin);

module.exports = { userRouter };
