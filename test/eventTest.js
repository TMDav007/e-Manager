const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require ('chai-http');
const app = require('./../server/server');
const should = chai.should();

chai.use(chaiHttp);

//Test for /Get route
describe('/GET events', () => {
    
      //test for Get all Events
      it('it should GET all the events', (done) => {
           chai.request(app)
              .get('/api/events')
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.property('events');
                  res.body.events.should.be.a('array').with.lengthOf(3);
                  res.body.should.have.property('error');
                  res.body.error.should.eql(false);
                 done();
              });
      })
  });
  
  //Test the Post routes
  describe('/POST an event', () =>{
      //Test for post with an existing Id
      it ('it should not POST an event with an existing id field',(done) =>{
          const event = {
              id              : "2",
              eventType       : "Wedding",
              eventLocation   : "Oriental",
              state           : "Lagos",
              date            : "12/12/2018"
          }
      
        chai.request(app)
          .post('/api/events')
          .send(event)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('event id already existing');
              res.body.should.have.property('error');
              res.body.error.should.eql(true);
              done();
          })
      })
  
      //Test for post with no Id
      it ('it should not POST an event without an id field',(done) =>{
          const event = {
              eventType       : "Wedding",
              eventLocation   : "Oriental",
              state           : "Lagos",
              date            : "12/12/2018"
          }
      
        chai.request(app)
          .post('/api/events')
          .send(event)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('event id is required');
              res.body.should.have.property('error');
              res.body.error.should.eql(true);
              done();
          })
      })
      
      //Test for post with to add a new event.
      it ('it should Add(post) a new event',(done) =>{
          const event = {
              id              : "4",
              eventType       : "Wedding",
              eventLocation   : "Oriental",
              state           : "Lagos",
              date            : "12/12/2018"
          }
      
        chai.request(app)
          .post('/api/events')
          .send(event)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('Success');
              res.body.should.have.property('error');
              res.body.error.should.eql(false);
              done();
          })
      })
      
  })
  
  //TEst for Get an EVent
  describe('/Get an event', () =>{
      //Test for post with an existing Id
      it ('it should get an event',(done) =>{
      const eventId = 2;
        chai.request(app)
          .get('/api/events/' +eventId)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('event');
              res.body.event.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('Success');
              res.body.should.have.property('error');
              res.body.error.should.eql(false);
              done();
          })
      })
  
      //GET an event 
      it ('it should get an event',(done) =>{
          const eventId = 4;
          chai.request(app)
          .get('/api/events/' +eventId)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('event not found');
              res.body.should.have.property('error');
              res.body.error.should.eql(true);
              done();
          })
      })
  })
  
  //Test for update an event
  describe('/Update an event', () =>{
      //PUT an event
      it ('it should update the event',(done) =>{
      const eventId = 2;
        chai.request(app)
          .put('/api/events/' +eventId)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('Update Successful');
              res.body.should.have.property('error');
              res.body.error.should.eql(false);
              done();
          })
      })
  
      // PUT an event 
      it ('it should get an not update the event',(done) =>{
          const eventId = 4;
          chai.request(app)
          .get('/api/events/' +eventId)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('event not found');
              res.body.should.have.property('error');
              res.body.error.should.eql(true);
              done();
          })
      })
  }) 
  
  //delete an event
  describe('/Delete an event', () =>{
      //DELETE an event
      it ('it should delete an event',(done) =>{
      const eventId = 2;
        chai.request(app)
          .delete('/api/events/' +eventId)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('Success');
              res.body.should.have.property('error');
              res.body.error.should.eql(false);
              done();
          })
      })
  
      // DELETE an event 
      it ('it should get an not delete the event',(done) =>{
          const eventId = 4;
          chai.request(app)
          .delete('/api/events/' +eventId)
          .end((err, res) =>{
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.message.should.eql('event not found');
              res.body.should.have.property('error');
              res.body.error.should.eql(true);
              done();
          })
      })
  }) 