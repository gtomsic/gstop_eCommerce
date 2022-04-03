require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const colors = require('colors');

const db = require('./models');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.get('/', (req, res) => {
  res.send(`Api is running ${PORT}`);
});

app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/review', reviewRoutes);

app.use('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Middleware url not found || 404
app.use(notFound);

// Custom error Middleware
app.use(errorHandler);

db.Order.hasOne(db.Address, { foreignKey: 'order_id', onDelete: 'cascade' });

db.User.hasMany(db.Address, { foreignKey: 'user_id', onDelete: 'cascade' });
db.User.hasMany(db.Product, { foreignKey: 'user_id', onDelete: 'cascade' });
db.User.hasMany(db.Review, { foreignKey: 'user_id', onDelete: 'cascade' });
db.User.hasMany(db.Order, { foreignKey: 'user_id', onDelete: 'cascade' });
db.User.hasMany(db.Item, { foreignKey: 'user_id', onDelete: 'cascade' });

db.Order.hasMany(db.Item, { foreignKey: 'order_id', onDelete: 'cascade' });
db.Order.hasMany(db.Payment, { foreignKey: 'order_id', onDelete: 'cascade' });
db.Product.hasMany(db.Item, { foreignKey: 'product_id', onDelete: 'cascade' });
db.Product.hasMany(db.Review, {
  foreignKey: 'product_id',
  onDelete: 'cascade',
});

db.Product.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'cascade' });
db.Review.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'cascade' });
db.Address.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'cascade' });
db.Order.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'cascade' });
db.Payment.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'cascade' });
db.Item.belongsTo(db.User, { foreignKey: 'user_id', onDelete: 'cascade' });

const server = http.createServer(app);

db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
        .yellow.bold.inverse
    );
  });
});
