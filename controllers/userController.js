
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
