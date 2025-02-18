const express = require('express');
const router = express.Router()
const ApiOrderController = require('../../controller/order.controller')
router.post("/", ApiOrderController.create)
router.get("/:userid", ApiOrderController.index)
router.get("/", ApiOrderController.index1)
router.patch("/order/orderId/status", ApiOrderController.updateStatus);
module.exports = router