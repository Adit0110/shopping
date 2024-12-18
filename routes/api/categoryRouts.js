const express = require('express');
const { body, validationResult } = require('express-validator');

const categoryRoutes = express.Router();
const categoryController = require('../../controllers/categoryController');

// Validation middleware
const validateCategory = [
    body('name').notEmpty().withMessage('Name is required')
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Define API routes
categoryRoutes.get('/list', categoryController.getAllCategoriesAPI);
categoryRoutes.get('/list/:id', categoryController.getCategoryByIdAPI);
categoryRoutes.post('/add', categoryController.createCategoryAPI);

module.exports = categoryRoutes;
