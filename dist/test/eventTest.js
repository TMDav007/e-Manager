'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('./../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

// Test for /Get route
describe('/GET events', function () {
  // test for Get all Events
  it('it should GET all the events', function (done) {
    _chai2.default.request(_server2.default).get('/api/events').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('result');
      res.body.result.should.be.a('array').with.lengthOf(3);
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });
});

// Test the Post routes
describe('/POST an event', function () {
  // Test for post with an existing Id
  it('it should not POST an event with an existing id field', function (done) {
    var event = {
      id: '2',
      eventType: 'Wedding',
      eventLocation: 'Oriental',
      state: 'Lagos',
      date: '12/12/2018'
    };

    _chai2.default.request(_server2.default).post('/api/events').send(event).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('event id already existing');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });

  // Test for post with no Id
  it('it should not POST an event without an id field', function (done) {
    var event = {
      eventType: 'Wedding',
      eventLocation: 'Oriental',
      state: 'Lagos',
      date: '12/12/2018'
    };

    _chai2.default.request(_server2.default).post('/api/events').send(event).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('event id is required');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });

  // Test for post with to add a new event.
  it('it should Add(post) a new event', function (done) {
    var event = {
      id: '4',
      eventType: 'Wedding',
      eventLocation: 'Oriental',
      state: 'Lagos',
      date: '12/12/2018'
    };

    _chai2.default.request(_server2.default).post('/api/events').send(event).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });
});

// TEst for Get an EVent
describe('/Get an event', function () {
  // Test for post with an existing Id
  it('it should get an event', function (done) {
    var id = 2;
    _chai2.default.request(_server2.default).get('/api/events/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('result');
      res.body.result.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });

  // GET an event
  it('it should not get an event', function (done) {
    var id = 4;
    _chai2.default.request(_server2.default).get('/api/events/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('not found');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });
});

// Test for update an event
describe('/Update an event', function () {
  // PUT an event
  it('it should update the event', function (done) {
    var eventId = 2;
    _chai2.default.request(_server2.default).put('/api/events/' + eventId).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Update Successful');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });

  // PUT an event
  it('it should get an not update the event', function (done) {
    var eventId = 4;
    _chai2.default.request(_server2.default).get('/api/events/' + eventId).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('not found');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });
});

// delete an event
describe('/Delete an event', function () {
  // DELETE an event
  it('it should delete an event', function (done) {
    var id = 2;
    _chai2.default.request(_server2.default).delete('/api/events/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });

  // DELETE an event
  it('it should get an not delete the event', function (done) {
    var id = 4;
    _chai2.default.request(_server2.default).delete('/api/events/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('not found');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });
});
//# sourceMappingURL=eventTest.js.map