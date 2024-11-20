const { S3Client, ListBucketsCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

let s3;

const connectS3 = async() => {
    s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });
}

const listBuckets = async() => {
    try {
        const command = new ListBucketsCommand({});
        const result = await s3.send(command);
        console.log('S3 Buckets:', result.Buckets);
        console.log("S3 bucket created successfully");
    } catch (error) {
        console.error('Error connecting to S3:', error);
    }
}

const uploadImage = async(file) => {
    try {
        const fileStream = fs.createReadStream(file.path);
        const folderName = 'doctors-image';
        const fileKey = `${folderName}/${Date.now()}-${file.originalname}`;
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: fileStream,
            ContentType: file.mimetype
        };
        const command = new PutObjectCommand(params);
        await s3.send(command);
        fileStream.destroy();
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    } catch (err) {
        throw new Error('Failed to upload image');
    }
}

module.exports = { connectS3, listBuckets, uploadImage };