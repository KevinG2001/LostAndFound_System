const AWS = require("aws-sdk");
const path = require("path");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const bucketName = process.env.AWS_BUCKET_NAME;

const uploadFileToS3 = (fileBuffer, originalName, itemID, mimeType) => {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(originalName);
    const fileName = `${itemID}${fileExtension}`;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    };

    s3.upload(params, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data.Location);
    });
  });
};

module.exports = { uploadFileToS3 };
