const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('buy', 'root', 'Adit$0110', {
    host: 'localhost',
    dialect: 'mysql'
});

const Category = require('./Category');

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
              msg: 'Name is required'
          }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
            msg: 'Name is required'
        }
    }
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: {
              msg: 'Price must be a decimal value'
          },
          min: {
              args: [0],
              msg: 'Price must be greater than zero'
          }
      }
    },
    stock:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notEmpty: {
            msg: 'stock is required'
        },
        isInt: {
            msg: 'stock must be an integer'
        }
    }
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'id'
        },
        validate: {
          notEmpty: {
              msg: 'Category ID is required'
          },
          isInt: {
              msg: 'Category ID must be an integer'
          }
      }
    }
}, {
    tableName: 'products',
    timestamps:false,
});

// // Establishing relationships
// Category.hasMany(Product, { foreignKey: 'category_id' });
// Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;

