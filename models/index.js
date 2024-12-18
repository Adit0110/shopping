/*const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('buy', 'root', 'Adit$0110', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql', etc.
    // other options
});

// Test the database connection
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}



module.exports = { sequelize, testDatabaseConnection };*/


/*const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql', // Adjust based on your database
    host: 'localhost',
    username: 'root',
    password: 'Adit$0110',
    database: 'buy',
    // other options
});

const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');

// Define associations
User.hasMany(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart, { through: 'CartItem' });
Cart.belongsToMany(Product, { through: 'CartItem' });

module.exports = {
    sequelize,
    User,
    Product,
    Cart,
};*/


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('buy', 'root', 'Adit$0110', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = require('./user'); // Adjust path if necessary
const Product = require('./Product'); // Adjust path if necessary
const Cart = require('./cart'); // Adjust path if necessary
const Order = require('./order');
const OrderItem = require('./orderItem');


User.associate = function (models) {
    User.hasMany(models.Cart, { foreignKey: 'userId' });
};

Product.associate = function (models) {
    Product.hasMany(models.Cart, { foreignKey: 'productId' });
};

Cart.associate = function (models) {
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    Cart.belongsTo(models.Product, { foreignKey: 'productId' });
};

Order.belongsTo(User, { foreignKey: 'userId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
Order.hasMany(OrderItem, { foreignKey: 'orderId' });

module.exports = {
    sequelize,
    Sequelize,
    User,
    Product,
    Cart,
    Order,
    OrderItem
};
