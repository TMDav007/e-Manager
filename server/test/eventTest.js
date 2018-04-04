import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

const date = `12/09/2019${Math.random()}`;
const id = Math.floor(Math.random() * 50) + 1;

// Test for /Post event
describe('/POST an event', () => {
  it('it should create an event after authenicating user', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const event = {
      location: 'lagos',
      center: 'Oriental',
      eventType: 'Concert',
      date,
      duration: 4,
      amount: '500,000',
    };
    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('token');
        /* eslint-disable prefer-destructuring */
        const token = res.body.token;
        chai.request(app)
          .post('/events/')
          .set('x-access-token', token)
          .send(event)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.be.property('message');
            res.body.message.should.eql('success');
            res.body.should.have.property('event');
            done();
          });
      });
  });

  it('it should not create a event with an existing event date', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const event = {
      location: 'lagos',
      center: 'Oriental',
      eventType: 'Concert',
      date: '12/03/2018',
      duration: 4,
      amount: '500,000',
    };

    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('token');
        /* eslint-disable prefer-destructuring */
        const token = res.body.token;
        chai.request(app)
          .post('/events/')
          .set('x-access-token', token)
          .send(event)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('date already existing');
            done();
          });
      });
  });

  it('it should not create a event with an invalid event type', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const event = {
      location: 'lagos',
      center: 'Oriental',
      eventType: 'others',
      date: '12/03/2018',
      duration: 4,
      amount: '500,000',
    };

    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('token');
        /* eslint-disable prefer-destructuring */
        const token = res.body.token;
        chai.request(app)
          .post('/events/')
          .set('x-access-token', token)
          .send(event)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('event type is required!!!');
            done();
          });
      });
  });
});

// Test for Update
describe('/put a event', () => {
  it('it should update a event', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };
    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('token');

        /* eslint-disable prefer-destructuring */
        const token = res.body.token;
        chai.request(app)
          .put(`/events/${id + 1}`)
          .set('x-access-token', token)
          .send({ location: 'oyo' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('success');
            res.body.should.have.property('updatedEvent');
            done();
          });
      });
  });

  it('it should not update a event', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const idd = 0;

    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('token');

        /* eslint-disable prefer-destructuring */
        const token = res.body.token;
        chai.request(app)
          .put(`/events/${idd}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('event not found');
            done();
          });
      });
  });
});

// Delete an event
describe('/Delete an event', () => {
  // DELETE a center
  it('it should delete an event', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('token');

        /* eslint-disable prefer-destructuring */
        const token = res.body.token;
        chai.request(app)
          .delete(`/events/${id + 1}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('event deleted');
            done();
          });
      });
  });

  it('it should not delete a event', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('token');

        /* eslint-disable prefer-destructuring */
        const token = res.body.token;
        chai.request(app)
          .delete(`/events/${id + 1}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('event not found');
            done();
          });
      });
  });
});
