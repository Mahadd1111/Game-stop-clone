// import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand,GetItemCommand,ScanCommand } from "@aws-sdk/client-dynamodb";

const dynamodb = new DynamoDBClient({ 
    region: "me-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
});

const userTables = "gamestop_admins"

export {
    dynamodb,
    userTables,
    QueryCommand,
    GetItemCommand,
    ScanCommand
}
