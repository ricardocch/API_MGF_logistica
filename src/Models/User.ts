import {DataTypes} from 'sequelize';

module.exports = (sequelize) => {

    sequelize.define('user',{
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        phone:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
        
})
}