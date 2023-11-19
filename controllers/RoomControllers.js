const { Room } = require('../models/Room.js');
const { v4: uuidv4 } = require('uuid');

const getRoom = async (req, res) => {
    try{
        const resp = await Room.findAll({
            order: [
                ['room_desc', 'ASC'], 
          ],
        });
        res.status(200).json({message: 'Success Retrieve Data', data: resp});
    } catch (err) {
        console.log(err.message);
    }
}

const addRoom = async (req, res) => {
    const requestBody = req.body

    try{
        const roomExist = await Room.findOne({
            where: {
                room_desc: requestBody.room_desc
            }
        })
        if(roomExist) return res.status(400).json({message: 'Room Already Exist', type: 'error'})
        const data = {
            room_id : uuidv4(),
            room_desc: requestBody.room_desc,
            room_price: requestBody.room_price,
        }
        await Room.create(data);
        const resp = await Room.findAll({
            order: [
                ['room_desc', 'ASC'], 
          ],
        });
        res.status(200).json({message: 'Room Created', data: resp});
    } catch (err) {
        return res.status(400).json({message: 'Service unavailable', type: 'error'})
    }
}

const updateRoom = async (req, res) => {
    const requestBody = req.body

    try{
        const data = {
            room_desc: requestBody.room_desc,
            room_price: requestBody.room_price,
            details: {
                nickname: requestBody.nickname,
                phone_number: requestBody.phone_number,
                gender: requestBody.gender
            }
        }
        await Room.update(data,{
            where: {
                room_id: requestBody.room_id
            }
        })

        const resp = await Room.findAll({
            order: [
                ['room_desc', 'ASC'], 
          ],
        });
        res.status(200).json({message: 'Room Detail Updated', data: resp});
    } catch (err) {
        res.status(500).json({message: 'Service Unavailable', type: 'error'});
    }
}

const findRoom = async (req, res) => {
    try{
        const resp = await Room.findOne({
            where: {
                room_id: req.params.id
            }
        })
        
        if(!resp) return res.status(200).json({message: 'No Data Match'})

        res.status(200).json({message: 'Success Retrieve Data', data: resp});
    } catch (err) {
        res.status(500).json({message: err.message, type: 'error'});
    }
}

const deleteRoom = async (req, res) => {
    try{
        await Room.destroy({
            where: {
                room_id: req.params.id
            }
        })

        const resp = await Room.findAll({
            order: [
                ['room_desc', 'ASC'], 
          ],
        });
        res.status(200).json({message: 'Room Deleted', data: resp});
    } catch (err) {
        res.status(500).json({message: err.message, type: 'error'});
    }
}

module.exports = {getRoom, addRoom, updateRoom, findRoom, deleteRoom};