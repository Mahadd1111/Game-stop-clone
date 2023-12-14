const express = require('express')
const productRouter = express.Router();
const { UploadProduct,SearchProducts } = require("../controllers/product");
const multipleupload = require("../middleware/multer")



productRouter.route('/upload').post(multipleupload,UploadProduct);
productRouter.route('/search').get(SearchProducts)


module.exports = productRouter;
