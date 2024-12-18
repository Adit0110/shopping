/*const express = require('express');
const { sequelize, connectDB } = require('./config/db');


const app=express();
const port=3000;

app.use(express.json());
app.use('/api/route');

app.listen(port,()=>{
    console.log(`Listening the port ${port}`);
})*/


/*const express = require('express');
const bodyParser = require('body-parser');

const { sequelize, connectDB } = require('./config/db');

const categoryRouts = require('./routes/categoryRouts');
const productRouts = require('./routes/productRouts');



const app = express();
app.use(express.json());
app.use('/api', router);
app.use('/adi', routers);

const PORT = process.env.PORT || 7000;

connectDB().then(() => {
  sequelize.sync().then(() => {
    
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/


/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Use API routes
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api', categoryRoutes);

// Example route
// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/



/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize } = require('./models'); 

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
//app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
//app.set('view engine', 'ejs');

// Use API routes
const categoryRoutes = require('./routes/api/categoryRouts');
const productRoutes = require('./routes/api/productRoutes');
app.use('/api', categoryRoutes);
app.use('/adi', productRoutes);*/

// Example route
// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });

// Start server
/*const sequelize = require('./models').sequelize;

sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/


// Synchronize the database and then start the server
/*sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');

  // Start the server after the database is synchronized
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to synchronize the database:', error);
});*/



const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// const userRoutes = require('./routes/api/userRoutes');
// const authRoutes=require('./routes/api/authRoutes');

const { sequelize } = require('./models'); // Import the Sequelize instance
const app = express();

// Middleware
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
const categoryRouts = require('./routes/api/categoryRouts');
const productRoutes = require('./routes/api/productRoutes');
const userRoutesApi = require('./routes/api/userRoutes');
const authRoutes=require('./routes/api/authRoutes');
const cartRoutes=require('./routes/api/cartRoutes');
const orderRoutes=require('./routes/api/orderRoutes');
const orderItemRoutes=require('./routes/api/orderItemRoutes');
//const middleRoutes=require('./routes/api/middleRoutes');

app.use('/api', categoryRouts);
app.use('/adi', productRoutes);
app.use('/user', userRoutesApi);
app.use('/auther',authRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);
app.use('/oi',orderItemRoutes);
//app.use('/auth', middleRoutes);

// Default route
// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });

// Synchronize the database and then start the server
sequelize.sync({ force: false }).then(() => {
    //console.log('Database & tables created!');

    // Start the server after the database is synchronized
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to synchronize the database:', error);
});
