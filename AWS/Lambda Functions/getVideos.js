const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
  var params = {
    TableName: process.env.TABLE_NAME
  };
  
  documentClient.scan(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.Items);
    }
  })
};
