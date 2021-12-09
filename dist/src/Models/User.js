"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "This field is required" },
                len: {
                    args: [8, 15],
                    msg: "Must have a length of 8 chars"
                }
            }
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            /*   validate:{
                  validatePassword:function(password:string){
                      if(!(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,12}$/.test(password))){
                          throw new Error('Password must have at least 8 characters and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character.')
                      }
                  }
              } */
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        admin: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        phone: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        }
    });
};
//# sourceMappingURL=User.js.map