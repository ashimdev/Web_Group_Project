const AWS = require('aws-sdk');
const crypto = require('crypto');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const videoID = crypto.randomBytes(16).toString('hex');
  const createdDate = new Date().toISOString();
  const videoURL = `${process.env.VIDEO_DISTRIBUTION_URL}/${event.videoName}-1080p.mp4`;
  const videoThumbnailURL = `${process.env.THUMBNAIL_DISTRIBUTION_URL}/${event.videoName}-192x108-00001.png`;

  const params = {
    Item: {
      "videoID": videoID,
      "videoPlaylistID": event.videoPlaylistID,
      "videoName": event.videoName,
      "videoDescription": event.videoDescription,
      "videoURL": videoURL,
      "videoThumbnailURL": videoThumbnailURL,
      "createdBy": event.userID,
      "lastUpdatedAt": createdDate,
      "lastUpdatedBy": event.userID
    },
    TableName: process.env.TABLE_NAME
  };

  try {
    await documentClient.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Video information saved successfully' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
