const express = require('express');
const { getRoom, addRoom, updateRoom, findRoom, deleteRoom } = require('../controllers/RoomControllers')

const roomRouter = express.Router()

roomRouter.get('/api/rooms', getRoom);
roomRouter.post('/api/rooms/createRoom', addRoom);
roomRouter.post('/api/rooms/editRoom', updateRoom);
roomRouter.get('/api/rooms/:id', findRoom);
roomRouter.delete('/api/rooms/:id', deleteRoom);

module.exports = { roomRouter };
