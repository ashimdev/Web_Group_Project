const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
  const userID = event.userID; // Assuming userID is passed as part of the event
  
  var params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      "userID": userID
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
