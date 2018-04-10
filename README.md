# e-Manager

[![Build Status](https://travis-ci.org/TMDav007/e-Manager.svg?branch=develop)](https://travis-ci.org/TMDav007/e-Manager)
[![Coverage Status](https://coveralls.io/repos/github/TMDav007/e-Manager/badge.svg)](https://coveralls.io/github/TMDav007/e-Manager)
[![Maintainability](https://api.codeclimate.com/v1/badges/89aec1151bbd137c03ca/maintainability)](https://codeclimate.com/github/TMDav007/e-Manager/maintainability)

This is an Event Manager application that allow a user schedule an event.
The application templates is on https://tmdav007.github.io/e-Manager/

## Installation
- To run this app, install node version 8.9.1 or above

- install node modules with command:
  > npm install

- Start API server with command:
  > npm start

- use the url on Postman:
  > http://localhost:3000

- Run test with:
  > npm test

## API Reference
- for events:
  >  https://evt-manager.herokuapp.com/api/events
  
 - for centers:
    >  https://evt-manager.herokuapp.com/api/centers
    
### API Routes
 - The API route to add:
 
    > POST: /
    
 - The API route to get all:
 
    > GET: /
    
 - The API route to get by id:
 
    > GET: /id/
    
- The API route to edit:

    > PUT: /id/
    
- The API route to delete:

    > DELETE: /id/


## API Documentation
- for events
   > https://app.swaggerhub.com/apis/TMDav/api/V1
- for centers
    > https://app.swaggerhub.com/apis/TMDav/centerAPI/v1
    
 ## Author
 - Afolabi, Opeyemi T.
 
 ## Acknowledgements
 - Andela, Nigeria.
 - Abaye, Emmauel.
