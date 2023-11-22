const AWS = require('aws-sdk');
const crypto = require('crypto');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const newUserID = crypto.randomBytes(16).toString('hex');
  const createdDate = new Date().toISOString();

  const params = {
    Item: {
      "userID": newUserID,
      "userEmail": event.userEmail,
      "password": event.password,
      "userTypeCode": "REG",
      "userDescription": event.userDescription,
      "createdBy": event.userID,
      "createdAt": createdDate,
      "lastUpdatedAt": createdDate,
      "lastUpdatedBy": event.userID
    },
    TableName: process.env.TABLE_NAME
  };

  try {
    await documentClient.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User information saved successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
