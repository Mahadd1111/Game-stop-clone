const express = require('express')
const productRouter = express.Router();
const { UploadProduct } = require("../controllers/product");


productRouter.route('/upload').post(UploadProduct);


module.exports = productRouter;
