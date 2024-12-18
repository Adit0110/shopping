const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('buy', 'root', 'Adit$0110', {
    host: 'localhost',
    dialect: 'mysql'
});
//const User = require('./user');
const Product = require('./Product');



const Cart = sequelize.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Product',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
    
},{

    tableName: 'cart',
    timestamps:false,

});

/*Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Cart;*/

// Define associations
Cart.belongsTo(Product, { foreignKey: 'productId' }); // Example of association

module.exports = Cart;