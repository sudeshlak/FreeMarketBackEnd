const AWS = require('aws-sdk'); // Requiring AWS SDK.

//mongoDB stored in the .env file
export abstract class Config {
  public static mongoUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.clyxp.mongodb.`
    + `net/shopping_cart?retryWrites=true&w=majority`;
}

// Configuring AWS
AWS.config = new AWS.Config({
  accessKeyId: process.env.S3_KEY, // stored in the .env file
  secretAccessKey: process.env.S3_SECRET, // stored in the .env file
  region: process.env.BUCKET_REGION // This refers to your bucket configuration.
});

// Creating a S3 instance
export const s3 = new AWS.S3();

// Retrieving the bucket name from env variable
export const Bucket = process.env.BUCKET_NAME;