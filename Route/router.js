const express = require("express");
const router = express.Router();
const middleware = require("../middleware/auth");

const { Register, Login, userDetails, UpdateProfile } = require("./Router/User");

const { addToOrder, getAllOrders } = require("./Router/Order");
const { addTocart, deletecart, getCarts } = require("./Router/cart");

const getAllProducts = require("./Router/product");


// User Route
router.route("/user/register").post(Register);
router.route("/user/login").post(Login);
router.route("/user/userDetails").get(middleware, userDetails);
router.route("/user/updateProfile").post(middleware, UpdateProfile);

// Order Route
router.route("/user_orders/addToOrder/:productId/:count/:email/:pin/:place").get(middleware, addToOrder);
router.route("/user_orders/getAllOrders").get(middleware, getAllOrders);

// Cart Route
router.route("/user_carts/addTocart/:productId/:count").get(middleware, addTocart);
router.route("/user_carts/deletecart/:productId").get(middleware, deletecart);
router.route("/user_carts/getCarts").get(middleware, getCarts);

// Product Route
router.route("/product/all").get(getAllProducts);


module.exports = router;