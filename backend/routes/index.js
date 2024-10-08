const authRouter = require('./auth');
const productRouter = require('./product');
const cartRouter = require('./cart');
const checkoutRouter = require('./checkout')
const orderRouter = require('./order');
//const productRouter = require('./product');
//const userRouter = require('./user');

module.exports = (app, passport) => {
  authRouter(app, passport);
  productRouter(app);
  cartRouter(app);
  checkoutRouter(app);
  orderRouter(app);
  //productRouter(app);
  //userRouter(app);
};