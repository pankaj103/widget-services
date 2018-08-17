'use strict';

const AWS = require('aws-sdk');

AWS.config.update({ region: "<REGION>" });

exports.call = function(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
}