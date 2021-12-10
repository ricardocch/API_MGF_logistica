"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('videos', {
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        roadMap: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        driver: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        origin: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        destiny: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        departureTime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        arrival: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        uploadDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        }
    });
};
//# sourceMappingURL=videos.js.map