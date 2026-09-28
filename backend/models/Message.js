const {Sequelize,DataTypes}=require('sequelize');
const db=require('../utils/db-connection');

const Message=db.define('message',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false

    },
     senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    messages:{
        type:DataTypes.STRING,
        allowNull:false
    }

});
module.exports=Message;