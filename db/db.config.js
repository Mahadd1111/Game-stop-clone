// import { DynamoDB } from "@aws-sdk/client-dynamodb";
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { QueryCommand, GetItemCommand, ScanCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");


const dynamodb = new DynamoDBClient({ 
    region: "me-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
});

const userTable = "gamestop_admins"
const productTable = "gamestop_products"

module.exports = {
    dynamodb,
    userTable,
    productTable,
    QueryCommand,
    GetItemCommand,
    ScanCommand,
    PutItemCommand
}
