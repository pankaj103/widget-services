'use strict';

const db = require('utilities/dynamoDBUtil');
const { success, failure } = require('utilities/lambdaUtil');

module.exports.handler = async (event) => {

  let principalId = event.requestContext.authorizer.principalId;
  let widgetId = event.pathParameters.widgetId;


  const params = {
    TableName: process.env.WIDGET_TABLE,
    Key: {
      principalId: principalId,
      conversationId: widgetId
    },
  };

  try {
    const res = await db.call('delete', params);
    return success(res);
  } catch (e) {
    console.log(e);
    return failure(e);
  }

};