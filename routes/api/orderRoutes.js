// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');

//router.post('/create', orderController.createOrder);
router.get('/:orderId', orderController.getOrderById);
router.put('/:orderId/update', orderController.updateOrder);
router.delete('/:orderId/delete', orderController.deleteOrder);
router.post('/create-direct', orderController.createDirectOrder);

module.exports = router;
