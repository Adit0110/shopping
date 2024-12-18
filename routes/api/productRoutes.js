const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const productController = require('../../controllers/productController');

// Validation middleware
const validateProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isDecimal().withMessage('Price must be a decimal value').custom(value => value > 0).withMessage('Price must be greater than zero'),
    body('category_id').isInt().withMessage('Category ID must be an integer')
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
router.get('/list', productController.getAllProductsAPI);
router.get('/list/:id', productController.getProductByIdAPI);
router.post('/add', productController.createProductAPI);

module.exports = router;
