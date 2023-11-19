const { DataTypes } = require("sequelize");
const { db } = require('../db.js');

const User = db.define('users', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password:  { 
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},
{
    freezeTableName:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})

module.exports = {User};

( async () => {
    await db.sync();
})();