'use strict';

const Ajv = require('ajv');
const uuidv1 = require('uuid/v1');

const db = require('utilities/dynamoDBUtil');
const { success, failure } = require('utilities/lambdaUtil');


module.exports.handler = async (event) => {

  let ajv = new Ajv({ allErrors: true });

  let principalId = event.requestContext.authorizer.principalId;
  let body = JSON.parse(event.body);
  let item = {};

  //to validate against JSON schema
  //let valid = ajv.validate(schema, body);

  if (!valid) {
    let error = {
      message: error
    }
    return failure(error);
  } else {

    item.principalId = principalId
    item.widgetId = uuidv1();
    item.lastModified = new Date().getTime();
    item.widget = body;

    const params = {
      TableName: process.env.WIDGET_TABLE,
      Item: item
    };

    try {
      let res = await db.call('put', params);
      return success(res);
    } catch (e) {
      return failure(e);
    }
  }
};


let schema = {}