'use strict';

const Ajv = require('ajv');

const db = require('utilities/dynamoDBUtil');
const { success, failure } = require('utilities/lambdaUtil');

module.exports.handler = async (event) => {

  let ajv = new Ajv({ allErrors: true });

  let principalId = event.requestContext.authorizer.principalId;
  let widgetId = event.pathParameters.widgetId;
  let body = JSON.parse(event.body);

  //to validate against JSON schema
  //let valid = ajv.validate(schema, body);

  if (!valid) {
    let error = {
      message: error
    }
    return failure(error);
  } else {

    const params = {
      TableName: process.env.WIDGET_TABLE,
      Key: {
        principalId: principalId,
        conversationId: widgetId
      },
      UpdateExpression: "SET widget = :widget, lastModified = :timestamp",
      ExpressionAttributeValues: {
        ":widget": body,
        ":timestamp": new Date().getTime()
      },
      ReturnValues: "ALL_NEW"
    };

    try {
      let res = await db.call('update', params);
      return success(res);
    } catch (e) {
      console.log(e);
      return failure(e);
    }
    
  }
};

let schema = {}