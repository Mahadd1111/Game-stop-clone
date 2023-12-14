const { v4: uuidv4 } = require('uuid');
const { PutItemCommand, productTable,dynamodb,ScanCommand } = require("../../db/db.config");
const { typescript } = require('../../next.config');
const {PutObjectCommand,GetObjectCommand} = require('@aws-sdk/client-s3')
const {s3client,bucketName} = require('../s3/s3.config')
const { getSignedUrl } =require("@aws-sdk/s3-request-presigner")
const crypto = require('crypto')

const UploadProduct =async(req, res) => {
    const newProduct = req.body;
    const images = req.files;
    const prod_images = []
    for (const image of images) {
        const randomImageName = (bytes=32)=>crypto.randomBytes(bytes).toString('hex')
        image_name = randomImageName()
        const params = {
            Bucket: bucketName,
            Key: image_name,
            Body: image.buffer,
            ContentType: image.mimetype
        };
        const command = new PutObjectCommand(params)
        await s3client.send(command)
        prod_images.push(image_name)
     }    
    const primaryKeyValue = uuidv4();
    console.log(primaryKeyValue)
    const prodImagesAttribute = prod_images.map(image => ({ S: image }));
    const command = new PutItemCommand({
        TableName: productTable,
        Item: {
            "id": { S: primaryKeyValue },
            "name": { S: newProduct.name },
            "desc": { S: newProduct.desc },
            "platform": { S: newProduct.platform },
            "type": { S: newProduct.type },
            "price": { N: newProduct.price.toString() },
            "manufacturer": { S: newProduct.manufacturer },
            "rating": { N: newProduct.rating.toString() },
            "sale": {"BOOL": newProduct.sale },
            "saleprice": { N: newProduct.saleprice.toString() },
            "esrb": { S: newProduct.esrb },
            "genre": { S: newProduct.genre },
            "images": { L: prodImagesAttribute },
        },
    })
    try{
        const result = await  dynamodb.send(command)
        console.log("Item added:", result);
        res.json({ message: 'Product uploaded successfully', success: true, newProduct });
    }catch(error){
        console.error("Error adding item:", error);
        res.json({ message: 'Product upload Failed', success: false, newProduct });
    }    
}

const SearchProducts = async(req,res)=>{
    console.log("Search Product API Called")
    try {
        const scanCommand = new ScanCommand({
          TableName: productTable,
        });
        const result = await dynamodb.send(scanCommand);
        console.log(result.Items[0].images)
        for (const item of result.Items) {
            if (item.images && item.images.L) {
                const imagesArray = item.images.L;
                for (const image of imagesArray) {
                    if (image.S) {
                        const getObjectParams={
                            Bucket:bucketName,
                            Key: image.S
                        }
                        const command = new GetObjectCommand(getObjectParams)
                        const signed_url = await getSignedUrl(s3client,command,{expiresIn:3600})
                        console.log("Signed Url : ",signed_url)
                        image.S = signed_url;
                    }
                }
            }
        }
        return res.json(result.Items);
      } catch (error) {
        console.error("Error scanning DynamoDB table:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
}

module.exports = {
    UploadProduct,
    SearchProducts
}