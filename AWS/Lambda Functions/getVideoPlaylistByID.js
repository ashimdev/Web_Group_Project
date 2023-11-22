const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
  const videoPlaylistID = event.videoPlaylistID; // Assuming videoPlaylistID is passed as part of the event
  
  var params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      "videoPlaylistID": videoPlaylistID
    }
  };
  
  documentClient.get(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.Item);
    }
  });
};
