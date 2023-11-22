const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const userID = event.userID;

  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      "userID": userID
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
        body: JSON.stringify({ message: 'User deleted successfully' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  });
};
