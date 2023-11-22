const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const videoPlaylistID = event.videoPlaylistID;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      "videoID": videoID
    }
  };

  documentClient.delete(params, (err, data) => {
    if (err) {
      callback(null, {
        statusCode: '400',
        body: err.message,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      callback(null, {
        statusCode: '200',
        body: JSON.stringify({ message: 'Video deleted successfully' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  });
};
