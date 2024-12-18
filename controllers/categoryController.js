const Category = require('../models/Category');
//const Product = require('../models/Product');


// Controller functions for JSON API
exports.getAllCategoriesAPI = async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
};

exports.getCategoryByIdAPI = async (req, res) => {
    const category = await Category.findByPk(req.params.id, {
        //include: Product
    });
    res.json(category);
};

exports.createCategoryAPI = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = await Category.create({ name, description });
        res.status(201).json(newCategory);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
          const messages = error.errors.map(e => e.message);
          res.status(400).json({ errors: messages });
      } else{
        res.status(500).json({ error: 'Internal server error' });
      }
    }
};

