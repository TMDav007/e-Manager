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

- use the url :
  > http:localhost:3000

- Run test with:
  > npm test

## API Reference
- for events:
  >  https://evt-manager.herokuapp.com/api/events
  
 - for centers:
    >  https://evt-manager.herokuapp.com/api/centers
    
### API Routes for events
 - The API route to add an event:
 
    > POST: /
    
 - The API route to get all events:
 
    > GET: /
    
 - The API route to get an event:
 
    > GET: /id/
    
- The API route to edit an event:

    > PUT: /id/
    
- The API route to delete an event:

    > DELETE: /id/
    
### API Routes for centers
 - The API route to add a center:
 
    > POST: /
    
 - The API route to get all centers:
 
    > GET: /
    
 - The API route to get a center:
 
    > GET: /id/
    
- The API route to edit a center:

    > PUT: /id/
    
- The API route to delete a center:

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
