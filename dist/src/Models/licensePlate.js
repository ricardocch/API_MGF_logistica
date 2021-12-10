"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('licensePlate', {
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=licensePlate.js.map