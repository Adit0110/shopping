const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('buy', 'root', 'Adit$0110', {
    host: 'localhost',
    dialect: 'mysql'
});
const Order = require('./order'); // Adjust the path as necessary
const Product = require('./Product'); // Adjust the path as necessary
const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'orderitem',
    timestamps: false // No need for timestamps in order items
});

module.exports = OrderItem;