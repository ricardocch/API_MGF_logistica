import {DataTypes} from 'sequelize';

module.exports = (sequelize) => {

    sequelize.define('videos',{
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        date:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        roadMap:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        driver:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        origin:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        destiny:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        departureTime:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        arrival:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        uploadDate:{
            type: DataTypes.DATE,
            allowNull: false,
        }}
    )}

        