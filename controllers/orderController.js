// controllers/orderController.js

const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Cart = require('../models/cart');
const Product = require('../models/Product');



exports.createDirectOrder = async (req, res) => {
    const { userId, items } = req.body;

    try {
        let totalprice = 0;

        // Create the order
        const newOrder = await Order.create({
            userId,
            totalprice: 0, // We'll calculate this later
            status: 'pending'
        });

        // Create order items and adjust product stock
        const orderItems = await Promise.all(items.map(async item => {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product ID ${item.productId}`);
            }

            // Calculate the total price for the order
            totalprice += product.price * item.quantity;

            // Reduce product stock
            product.stock -= item.quantity;
            await product.save();

            return await OrderItem.create({
                orderId: newOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                price: product.price
            });
        }));

        // Update the order with the correct total price
        newOrder.totalprice = totalprice;
        await newOrder.save();

        res.status(201).json({
            message: 'Order created successfully',
            order: newOrder,
            orderItems
        });
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};



exports.createOrder = async (req, res) => {
    const { userId } = req.body;

    try {
        const cartItems = await Cart.findAll({
            where: { userId },
            include: ['product'] // Assuming you have defined the association in Cart model
        });
        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ error: 'No items found in the cart for this user' });
        }
        // Calculate total price and prepare order items
        let totalprice = 0;
        const orderItems = [];
        for (let i = 0; i < cartItems.length; i++) {
            const cartItem = cartItems[i];
            const { productId, quantity } = cartItem;

            // Fetch product price
            const product = cartItem.product;
            const price = product.price;

            // Calculate subtotal for this order item
            const subtotal = price * quantity;
            totalprice += subtotal;

            // Prepare order item
            orderItems.push({
                productId,
                quantity,
                price,
                subtotal
            });
        }

        // Create the order
        const newOrder = await Order.create({
            userId,
            totalprice,
            status: 'pending'
        });

        // Create order items
        const createdOrderItems = await OrderItem.bulkCreate(orderItems.map(item => ({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal
        })));

        res.status(201).json({ message: 'Order created successfully', order: newOrder, orderItems: createdOrderItems });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getOrderById = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Find the order by its ID and include related order items
        const order = await Order.findByPk(orderId, {
            include: { model: OrderItem, attributes: ['quantity', 'price'] }
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const { userId, totalprice, status } = req.body;

    try {
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Update order fields
        order.userId = userId;
        order.totalprice = totalprice;
        order.status = status;

        await order.save();

        res.status(200).json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        // Find the order by its ID
        const order = await Order.findByPk(orderId);

        // If order not found, return 404
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Delete the order
        await order.destroy();

        // Respond with success message
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
        
