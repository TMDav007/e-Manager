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
describe('/GET centers', function () {
  // test for Get all Events
  it('it should GET all the centers', function (done) {
    _chai2.default.request(_server2.default).get('/api/centers').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.have.property('result');
      res.body.result.should.be.a('array').with.lengthOf(2);
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });
});

// POST centers
describe('/POST a center', function () {
  // Test for post with an existing Id
  it('it should not POST a center with an existing id field', function (done) {
    var center = {
      id: 2,
      name: 'Oriental',
      cost: '150,000'
    };

    _chai2.default.request(_server2.default).post('/api/centers').send(center).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql("the 'id' already existing");
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });

  // Test for post with no Id
  it('it should not POST a center without an id field', function (done) {
    var center = {
      name: 'Oriental',
      cost: '150,000'
    };
    _chai2.default.request(_server2.default).post('/api/centers').send(center).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql("the 'id' is required");
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });

  // Test for post with to add a new center.
  it('it should Add(post) a new center', function (done) {
    var center = {
      id: 3,
      name: 'Oriental',
      cost: '150,000'
    };

    _chai2.default.request(_server2.default).post('/api/centers').send(center).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });
});

// PUT(Update) a center
describe('/Update a center', function () {
  // PUT a center
  it('it should update the center', function (done) {
    var id = 2;
    _chai2.default.request(_server2.default).put('/api/centers/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Update Successful');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });

  // PUT a center
  it('it should get an not update', function (done) {
    var id = 4;
    _chai2.default.request(_server2.default).put('/api/centers/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('not found');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });
});

// Delete a center
describe('/Delete an event', function () {
  // DELETE a center
  it('it should delete an center', function (done) {
    var id = 2;
    _chai2.default.request(_server2.default).delete('/api/centers/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('Success');
      res.body.should.have.property('error');
      res.body.error.should.eql(false);
      done();
    });
  });

  // DELETE an event
  it('it should not delete the center', function (done) {
    var id = 4;
    _chai2.default.request(_server2.default).delete('/api/centers/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('not found');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });
});

// GET a center
describe('/Get a center', function () {
  // GET a center with an Id
  it('it should get a center', function (done) {
    var id = 1;
    _chai2.default.request(_server2.default).get('/api/centers/' + id).end(function (err, res) {
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

  // GET a center got no id
  it('it should not get a center', function (done) {
    var id = 4;
    _chai2.default.request(_server2.default).get('/api/centers/' + id).end(function (err, res) {
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.eql('not found');
      res.body.should.have.property('error');
      res.body.error.should.eql(true);
      done();
    });
  });
});
//# sourceMappingURL=centerTest.js.map