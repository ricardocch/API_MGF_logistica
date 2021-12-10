const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user',{
        id: {
            type:DataTypes.INTEGER,
            autoIncrement:true,         
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        admin:{
            type:DataTypes.ENUM('sa', 'admin', 'usuario'),
            allowNull:false
        },
        active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        cuit:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
        }
    },{
        timestamps:false
    }
)}