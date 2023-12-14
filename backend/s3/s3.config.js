const {S3Client,PutObjectCommand} = require("@aws-sdk/client-s3")
const dotenv = require('dotenv').config({ path: '../../.env.local' });

const bucketName = process.env.S3_BUCKET_NAME
const bucketRegion = process.env.S3_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials:{
        accessKeyId:accessKey,
        secretAccessKey:secretAccessKey, 
    },
    region:bucketRegion
})

module.exports={
    s3client:s3,
    bucketName:bucketName
}