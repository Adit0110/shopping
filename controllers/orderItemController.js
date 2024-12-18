const OrderItem = require('../models/orderItem');
const Product = require('../models/Product');
const Order = require('../models/order');
const Cart = require('../models/cart');


exports.createOrderItem = async (req, res) => {
    const { orderId, productId, quantity } = req.body;

    try {
        // Find the product
        const product = await Product.findByPk(productId);
        if (!product || product.stock < quantity) {
            return res.status(400).json({ error: 'Insufficient stock or product not found' });
        }

        // Find the order
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Calculate price
        const price = product.price;

        // Create the order item
        const newOrderItem = await OrderItem.create({
            orderId,
            productId,
            quantity,
            price
        });

        // Reduce the stock
        product.stock -= quantity;
        await product.save();

        res.status(201).json({ message: 'Order item created successfully', orderItem: newOrderItem });
    } catch (error) {
        console.error('Error creating order item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateOrderItem = async (req, res) => {
    const { orderItemId, quantity } = req.body;

    try {
        // Find the order item
        const orderItem = await OrderItem.findByPk(orderItemId);
        if (!orderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        // Find the product
        const product = await Product.findByPk(orderItem.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Calculate the quantity difference
        const quantityDifference = quantity - orderItem.quantity;

        // Check if there is enough stock to update the order item
        if (product.stock < quantityDifference) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }

        // Update the order item
        orderItem.quantity = quantity;
        await orderItem.save();

        // Adjust the product stock
        product.stock -= quantityDifference;
        await product.save();

        res.status(200).json({ message: 'Order item updated successfully', orderItem });
    } catch (error) {
        console.error('Error updating order item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteOrderItem = async (req, res) => {
    const { orderItemId } = req.body;

    try {
        // Find the order item
        const orderItem = await OrderItem.findByPk(orderItemId);
        if (!orderItem) {
            return res.status(404).json({ error: 'Order item not found' });
        }

        // Find the product
        const product = await Product.findByPk(orderItem.productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Adjust the product stock
        product.stock += orderItem.quantity;
        await product.save();

        // Delete the order item
        await orderItem.destroy();

        res.status(200).json({ message: 'Order item deleted successfully' });
    } catch (error) {
        console.error('Error deleting order item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



