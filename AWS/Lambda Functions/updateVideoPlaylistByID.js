const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = function(event, context, callback) {
  const videoPlaylistID = event.videoPlaylistID; // Assuming videoPlaylistID is passed as part of the event
  console.warn(videoPlaylistID);
  const lastUpdatedAt = new Date().toISOString();

  // Configuration object that maps attribute names in the event to attribute names in the table
  const attributeMappings = {
    "videoPlaylistName": "videoPlaylistName",
    "videoPlaylistCategoryCode": "videoPlaylistCategoryCode",
    "videoPlaylistDescription": "videoPlaylistDescription",
    "lastUpdatedBy": "lastUpdatedBy"
    // Add more attribute mappings as needed
  };

  const updatedAttributes = {};
  const updateExpression = [];
  const expressionAttributeNames = {}; // <-- Use a new object to store attribute names
  const expressionAttributeValues = {}; // <-- Use a new object to store attribute values

  // Build the update expression, expression attribute names, and expression attribute values
  for (const key in event) {
    if (event.hasOwnProperty(key) && attributeMappings.hasOwnProperty(key)) {
      const attributeName = attributeMappings[key];
      updateExpression.push(`#${attributeName} = :${key}`);
      expressionAttributeNames[`#${attributeName}`] = key; // <-- Map the attribute name to the placeholder
      expressionAttributeValues[`:${key}`] = event[key]; // <-- Map the attribute value to the placeholder
    }
  }

  // Add lastUpdatedAt separately to the expression attribute names and values
  updateExpression.push("#lastUpdatedAt = :lastUpdatedAt");
  expressionAttributeNames["#lastUpdatedAt"] = "lastUpdatedAt"; // <-- Map the attribute name to the placeholder
  expressionAttributeValues[":lastUpdatedAt"] = lastUpdatedAt; // <-- Map the attribute value to the placeholder

  var params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      "videoPlaylistID": videoPlaylistID
    },
    UpdateExpression: "SET " + updateExpression.join(", "),
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW" // To return the updated item after the update is complete
  };

  documentClient.update(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data.Attributes);
    }
  });
};
