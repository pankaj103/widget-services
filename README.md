## Synopsis

This is a lambda based implementation of micro service layer

## Motivation

Based on nano service architecture, each method can be updated and deployed separatly.


## Installation

Full description is here
https://serverless.com/framework/docs/getting-started/


npm install -g serverless

update aws credentials in ~/.aws/credentials
update aws config in ~/.aws/config - create new profile and add keys for serverless-admin user

update these entries in serverless.yml to match your preference

  region:
  profile: 

#From inside folder call 
npm install

#to deploy call
serverless deploy --verbose
#(NOTE - deploy can take several minutes, feels like it is stuck!!)

#to deploy faster and only one function

serverless deploy function --function myFunction

#delete stack
serverless remove --stage dev --region us-east-1

enjoy!!