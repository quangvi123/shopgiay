
const express = require('express');
const router = express.Router()
const UserAdminRoute = require("./apiUser")
const CategoryAdminRoute = require("./apiCategory")
const ProductAdminRoute = require("./apiProduct")
const CartAdminRoute = require("./apiCart")
 const OrderAdminRoute = require("./apiOrder")
 const OrderItemAdminRoute = require("./apiOrderItem")
router.use("/users", UserAdminRoute)
router.use("/categories", CategoryAdminRoute)
router.use("/products", ProductAdminRoute)
router.use("/cart", CartAdminRoute)
router.use("/order", OrderAdminRoute)
router.use("/orderItem",OrderItemAdminRoute)
module.exports = router