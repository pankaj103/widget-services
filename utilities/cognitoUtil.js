'use strict';

const AWS = require('aws-sdk');

AWS.config.update({ region: "<REGION>" });
AWS.config.apiVersions = { cognitoidentityserviceprovider: '2016-04-18' };

exports.getProfile = function(token) {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  var params = {
    AccessToken: token
  };

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.getUser(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        let profile = {};
        profile.userName = data.Username;
        const UA = data.UserAttributes;
        for (var i = 0; i < UA.length; i++) {
          if (UA[i].Name == 'email') profile.email = UA[i].Value;
          if (UA[i].Name == 'given_name') profile.firstName = UA[i].Value;
          if (UA[i].Name == 'family_name') profile.lastName = UA[i].Value;
        }
        resolve(profile);
      }
    })
  })
}