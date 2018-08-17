'use strict';


const db = require('utilities/dynamoDBUtil');
const { success, failure } = require('utilities/lambdaUtil');


module.exports.handler = async (event) => {

  let principalId = event.requestContext.authorizer.principalId;

  const params = {
    TableName: process.env.WIDGET_TABLE,
    KeyConditionExpression: "principalId = :principalId",
    ProjectionExpression: "widgetId, lastModified",
    ExpressionAttributeValues: {
      ":principalId": principalId
    }
  };


  try {
    let res = await db.call('query', params);
    return success(res.Items);
  } catch (e) {
    console.log(e);
    return failure(e);
  }
};
