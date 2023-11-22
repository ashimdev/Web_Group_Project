const AWS = require('aws-sdk');
const crypto = require('crypto');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
  const videoPlaylistID = crypto.randomBytes(16).toString('hex');
  const createdDate = new Date().toISOString();;
  
  const params = {
    Item: {
      "videoPlaylistID": videoPlaylistID,
      "videoPlaylistName": event.videoPlaylistName,
      "videoPlaylistCategoryCode": event.videoPlaylistCategoryCode,
      "videoPlaylistDescription": event.videoPlaylistDescription,
      "createdAt": createdDate,
      "createdBy": event.userID,
      "lastUpdatedAt": createdDate,
      "lastUpdatedBy": event.userID
    },
    TableName: process.env.TABLE_NAME
  };
  documentClient.put(params, function(err, data) {
    callback(err, data)
  });
};
