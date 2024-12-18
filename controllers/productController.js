



/*const { Sequelize } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProductsAPI = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Category,
                attributes: [],
                as: 'Category', // Use the correct alias defined in the association
            },
            attributes: { 
                include: [[Sequelize.col('Category.name'), 'category_name']] // Use the correct alias
            }
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProductByIdAPI = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
            include: {
                model: Category,
                attributes: [],
                as: 'Category' // Use the correct alias defined in the association
            },
            attributes: [
                'id',
                'name',
                'description',
                'price',
                'stock',
                'category_id',
                [Sequelize.col('Category.name'), 'category_name'] // Use the correct alias
            ]
        });

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createProductAPI = async (req, res) => {
    const { name, description, price, stock, category_id } = req.body;
    try {
        const category = await Category.findByPk(category_id)
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const newProduct = await Product.create({ name, description, price, stock, category_id });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(e => e.message);
            res.status(400).json({ errors: messages });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};*/


const { sequelize } = require('../models'); // Import the Sequelize instance

exports.getAllProductsAPI = async (req, res) => {
    try {
        const query = `
            SELECT p.id, p.name, p.description, p.price, p.stock, p.category_id, c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
        `;
        const products = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProductByIdAPI = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT p.id, p.name, p.description, p.price, p.stock, p.category_id, c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = :id
        `;
        const [product, _] = await sequelize.query(query, { replacements: { id }, type: sequelize.QueryTypes.SELECT });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createProductAPI = async (req, res) => {
    const { name, description, price, stock, category_id } = req.body;
    try {
        const query = `
            INSERT INTO products (name, description, price, stock, category_id)
            VALUES (:name, :description, :price, :stock, :category_id)
        `;
        await sequelize.query(query, { replacements: { name, description, price, stock, category_id } });
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


