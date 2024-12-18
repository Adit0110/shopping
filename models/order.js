const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('buy', 'root', 'Adit$0110', {
    host: 'localhost',
    dialect: 'mysql'
});
const OrderItem = require('./orderItem');
const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalprice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    tableName: 'orders',
    timestamps: false // Add timestamps for createdAt and updatedAt
});

Order.hasMany(OrderItem, { as: 'items', foreignKey: 'orderId' });

module.exports = Order;