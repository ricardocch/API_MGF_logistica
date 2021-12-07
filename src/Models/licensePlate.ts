import {DataTypes} from 'sequelize';

module.exports = (sequelize) => {

    sequelize.define('licensePlate',{
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
       
})
}