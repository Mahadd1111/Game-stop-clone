const multer = require("multer")

const storage = multer.memoryStorage();

const multipleupload = multer({storage}).array("file",10);

module.exports = multipleupload 