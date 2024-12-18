// routes/orderItemRoutes.js
const express = require('express');
const router = express.Router();
const orderItemController = require('../../controllers/orderItemController');

router.post('/create', orderItemController.createOrderItem);
//router.get('/:orderItemId', orderItemController.getOrderItemById);
router.put('/:orderItemId/update', orderItemController.updateOrderItem);
router.delete('/:orderItemId/delete', orderItemController.deleteOrderItem);

module.exports = router;
