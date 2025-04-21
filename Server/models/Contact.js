// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/config");

// const ContactMessage = sequelize.define(
//   "ContactMessage",
//   {
//     contact_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     message: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     read: { 
//       type: DataTypes.BOOLEAN,
//       defaultValue: false, 
      
//     },
//     created_at: {
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     tableName: "contactmessage", // The name of the table in your database
//     timestamps: false, // Set to false as we are manually handling the created_at field
//   }
// );

// module.exports = ContactMessage;
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
      unique: true,  // إضافة لضمان تميز البريد الإلكتروني
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
    // يمكنك إضافة updated_at إذا احتجت
    // updated_at: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    tableName: "contactmessage",
    timestamps: false, // يتم التعامل مع created_at/updated_at يدويًا
  }
);

module.exports = ContactMessage;
