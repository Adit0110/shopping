// controllers/cartController.js

//const { Cart } = require('../models/cart');

const { Cart, Product } = require('../models');


exports.addToCart = async(req,res)=>{
    const { userId, productId, quantity } = req.body;
    console.log(`Received userId: ${userId}, productId: ${productId}, quantity: ${quantity}`);
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({error: "Product not found."});
        }

        const cartItem = await Cart.findOne({ where:{userId, productId}});
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await Cart.create({ userId, productId, quantity});
        }

        res.status(201).json({ message:"Item added to cart successfully." });
    } catch (error) {
        console.error('Error additng item to cart!',error.message, error.stack);
        res.status(500).json({error: "Internel Server error"});
    }
};
exports.removeFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cartItem = await Cart.findOne({ where: { userId, productId } });
        if (!cartItem) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        await cartItem.destroy();
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.viewCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [Product]
        });

        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.allCart = async (req, res) => {
    const cartItems = await Category.findAll();
    res.json(cartItems);
};