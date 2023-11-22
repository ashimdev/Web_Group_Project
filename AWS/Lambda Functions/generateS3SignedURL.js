const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = function(event, context, callback) {
  const bucketName = 'centennial-video-source'; // Replace with your S3 bucket name
  const objectKey = event.fileName; // Replace with the object key under which the file will be saved in S3
  const expiration = 300; // 5 minutes in seconds
  const contentType = 'video/mp4'; // Replace with the content type of the file you are uploading

  const params = {
    Bucket: bucketName,
    Key: objectKey,
    ContentType: contentType,
    Expires: expiration
  };

  s3.getSignedUrl('putObject', params, function(err, url) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { preSignedUrl: url });
    }
  });
};
