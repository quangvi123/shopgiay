
const express = require('express');
const router = express.Router()
const ApiProductController = require('../../controller/product.controller')

router.get("/", ApiProductController.index)
router.post("/", ApiProductController.create)
router.delete("/:id",ApiProductController.delete)
router.patch("/:id", ApiProductController.update)
router.get("/:id", ApiProductController.findById)

module.exports = router