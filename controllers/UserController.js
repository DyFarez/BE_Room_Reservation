const { User } = require('../models/User.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(req.body.password, salt);
    try{
        await User.create({
            user_id: uuidv4(),
            username: req.body.username,
            password: encryptPassword
        });
        res.status(200).json({message: 'Registration Success', type: 'success'})
    }catch(err){
        if(err.parent.errno === 1062) return res.status(500).json({message: 'Username already in use', type: 'error'})
        return res.status(500).json({message: 'Service Unavailable', type: 'error'})
    }
}

const loginUser = async (req, res) => {
    try{
        const selectedUser = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        const validationPassword = await bcrypt.compare(req.body.password, selectedUser.password )
        if(!validationPassword) return res.status(400).json({message: 'Invalid Password', type: 'error'})
        const user_id = selectedUser.user_id;
        const username = selectedUser.username;
        const accessToken = jwt.sign({user_id, username}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({user_id, username}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await User.update({refresh_token: refreshToken},{
            where:{
                user_id: user_id
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.cookie('username', username,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const responseData = {username, accessToken}
        res.json({ message: 'Success Login', data: responseData });
    }catch(err){
        return res.status(404).json({message: 'Username has not been registered', type: 'error'})
    }
}

const logoutUser = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log('refreshToken ini logout',refreshToken)
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].user_id;
    await User.update({refresh_token: null},{
        where:{
            user_id: userId
        }
    });
    res.clearCookie('refreshToken');
    res.clearCookie('username');
    return res.sendStatus(200);
}

const isLogin = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken) return res.status(200).json({verify: true});
    else return res.status(200).json({verify: false});
}

const userLogin = async (req, res) => {
    try{
        const userCookie = req.cookies.username;
        if(!userCookie) return res.status(204).json({data: ''})
        const user = await User.findOne({
            where: {
                username: userCookie
            }
        })
        const username = user.username
        res.status(200).json({data: username})
    }catch(err){
        console.log(err)
    }
}

module.exports = { loginUser, logoutUser, registerUser, isLogin, userLogin};