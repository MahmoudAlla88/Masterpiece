
const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const ContactMessage = sequelize.define(
  "ContactMessage",
  {
    contact_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,  
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

  },
  {
    tableName: "contactmessage",
    timestamps: false, 
  }
);

module.exports = ContactMessage;
