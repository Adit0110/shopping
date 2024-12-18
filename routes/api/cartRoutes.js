// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cartController');

router.post('/add', cartController.addToCart);
router.delete('/remove', cartController.removeFromCart);
router.get('/:userId', cartController.viewCart);
router.get('/all', cartController.allCart);


module.exports = router;
