const { v4: uuidv4 } = require('uuid');
const { PutItemCommand, productTable,dynamodb } = require("../../db/db.config");
const { typescript } = require('../../next.config');

const UploadProduct = async (req, res) => {
    console.log("Reached Here")
    const newProduct = req.body
    console.log(newProduct)
    const primaryKeyValue = uuidv4();
    console.log(primaryKeyValue)
    const command = new PutItemCommand({
        TableName: productTable,
        Item: {
            "id": { S: primaryKeyValue },
            "name": { S: newProduct.data.name },
            "desc": { S: newProduct.data.desc },
            "platform": { S: newProduct.data.platform },
            "type": { S: newProduct.data.type },
            "price": { N: newProduct.data.price.toString() },
            "manufacturer": { S: newProduct.data.manufacturer },
            "rating": { N: newProduct.data.rating.toString() },
            "sale": {"BOOL": newProduct.data.sale },
            "saleprice": { N: newProduct.data.saleprice.toString() },
            "esrb": { S: newProduct.data.esrb },
            "genre": { S: newProduct.data.genre },
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

module.exports = {
    UploadProduct
}