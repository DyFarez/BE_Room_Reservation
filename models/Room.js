const { DataTypes } = require("sequelize");
const { db } = require('../db.js');

const Room = db.define('rooms', {
    room_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    room_desc: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    room_price:  { 
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
         type: DataTypes.JSON,
         allowNull: true,
    },
},
{
    freezeTableName:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

module.exports = {Room};

( async () => {
    await db.sync();
})();