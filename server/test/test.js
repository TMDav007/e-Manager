import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';
import Model from './../models';

const { User } = Model;

process.env.NODE_ENV = 'test';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);
// variable details
const centerName = `lekki-event${Math.random()}`;
const date = `12/09/2019${Math.random()}`;
let token = '';

const user = {
  name: 'fififi',
  email: `me2you${Math.random()}@yahoo.com `,
  phoneNo: '08095483746',
  password: 'Opeyemi22',
  confirmPassword: 'Opeyemi22',
};

const loginDetails = {
  email: user.email,
  password: user.password
};

const center = {
  centerName,
  price: '500,000',
  location: 'lagos',
  userId: 1,
};

const event = {
  location: 'lagos',
  center: 'Oriental',
  eventType: 'Concert',
  date,
  duration: 4,
  amount: '500,000',
  centerId: 1,
  userId: 1,
};

describe('Login and checkToken', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done();
    });
  });
});

// Test for sign up
describe('/user ', () => {
  it('it should signup user', () => {
    // variable details
    chai.request(app)
      .post('/users/')
      .send(user)
      .then((res) => {
        res.should.have.status(200);
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('message');
        res.body.message.should.eql('sign up successful');
        res.body.should.have.property('token');
      });
  });

  it('it should not signup user', (done) => {
    // variable details
    chai.request(app)
      .post('/users')
      .field('name', user.name = '')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('name is required');
        done();
      });
  });

  it('it should not signup user with no email', () => {
    // variable details
    chai.request(app)
      .post('/users')
      .field('name', user.name)
      .field('email', user.email = '')
      .then((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('email is required');
      });
  });

  it('it should not signup user with an empty password', () => {
    // variable details
    user.password = '';
    chai.request(app)
      .post('/users')
      .field('name', user.name)
      .field('email', user.email)
      .field('password', user.password)
      .then((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('phone number is required');
      });
  });

  it('it should not signup user with an invalid phone nunber', () => {
    // variable details
    user.phoneNo = 'dfg4567777';
    chai.request(app)
      .post('/users')
      .field('name', user.name)
      .field('email', user.email)
      .field('password', user.password)
      .field('phoneNo', user.phoneNo)
      .then((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('valid phone number required');
      });
  });

  it('it should not signup user with an unconfirmed password', () => {
    // variable details
    user.confirmPassword = 'hdhdgs';
    chai.request(app)
      .post('/users')
      .field('name', user.name)
      .field('email', user.email)
      .field('password', user.password)
      .field('phoneNo', user.phoneNo)
      .field('confirmPassword', user.confirmPassword)
      .then((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('password not confirmed');
      });
  });
});

// test for login
describe('/login a user', () => {
  it('it should not login with an incorrect email ', () => {
    // variable details
    loginDetails.email = 'sddshgjs';
    // login users details
    chai.request(app)
      .post('/users/login')
      .field('email', loginDetails.email)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('email not found');
      });
  });

  it('it should login ', () => {
    chai.request(app)
      .post('/users/login')
      .field('email', loginDetails.email)
      .field('password', loginDetails.password)
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        /* eslint-disable prefer-destructuring */
        token = res.body.data.token;
      });
  });
});

describe('/login a user', () => {
  it('it should not login with an incorrect password ', () => {
    // variable details
    loginDetails.password = 'sddshgjs';

    // login users details
    chai.request(app)
      .post('/users/login')
      .field('email', loginDetails.email)
      .field('password', loginDetails.password)
      .then((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(false);
        res.body.should.have.property('token');
      });
  });
});

// POST centers
describe('/POST a center', () => {
  it('it should create a center after authenicating user', () => {
    chai.request(app)
      .post('/centers/')
      .set('x-access-token', token)
      .field('centerName', center.centerName)
      .field('price', center.price)
      .field('location', center.location)
      .field('userId', center.userId)
      .then((err, res) => {
        res.body.should.be.a('object');
        res.body.should.be.property('message');
        res.body.message.should.eql('center created');
        res.body.should.have.property('center');
        center.id = res.body.data.id;
      });
  });

  it('it should not create a center with an existing center name', () => {
    // variable details

    center.centerName = 'lekki-Event';
    chai.request(app)
      .post('/centers/')
      .set('x-access-token', token)
      .field('centerName', center.centerName)
      .then((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('center name already existing');
      });
  });
});

// get a center

describe('/get a center', () => {
  it('it should get a center', () => {
    // login users details
    chai.request(app)
      .get(`/centers/${center.id}`)
      .set('x-access-token', token)
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('success');
        res.body.should.have.property('center');
        center.id = res.body.data.id;
      });
  });

  it('it should not get a center', () => {
    chai.request(app)
      .get(`/centers/${20000}`)
      .set('x-access-token', token)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('center not found');
      });
  });
});

// update a center
describe('/put a center', () => {
  it('it should update a center', () => {
    chai.request(app)
      .put(`/centers/${center.centerName}`)
      .set('x-access-token', token)
      .field('location', center.location = 'oyo')
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('success');
      });
  });

  it('it should not update a center', () => {
    chai.request(app)
      .put(`/centers/${'orange-evt'}`)
      .set('x-access-token', token)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('center not found');
      });
  });
});

// Delete a center
describe('/Delete a center', () => {
  // DELETE a center
  it('it should delete a center', () => {
    chai.request(app)
      .delete(`/centers/${center.centerName}`)
      .set('x-access-token', token)
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('center deleted');
      });
  });

  it('it should not delete a center', () => {
    chai.request(app)
      .delete(`/centers/${center.centerName}`)
      .set('x-access-token', token)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('center not found');
      });
  });
});

// Test for /Post event
describe('/POST an event', () => {
  it('it should create an event after authenicating user', () => {
    chai.request(app)
      .post('/events/')
      .set('x-access-token', token)
      .field('location', event.location)
      .field('center', event.center)
      .field('eventType', event.eventType)
      .field('date', event.date)
      .field('duration', event.duration)
      .field('amount', event.amount)
      .field('centerId', event.centerId)
      .field('userId', event.userId)
      .then((err, res) => {
        res.body.should.be.a('object');
        res.body.should.be.property('message');
        res.body.message.should.eql('success');
        res.body.should.have.property('event');
        event.id = res.body.data.id;
      });
  });

  it('it should not create a event with an existing event date', () => {
    chai.request(app)
      .post('/events/')
      .set('x-access-token', token)
      .field('date', event.date)
      .then((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('date already existing');
      });
  });

  it('it should not create a event with an invalid event type', () => {
    chai.request(app)
      .post('/events/')
      .set('x-access-token', token)
      .field('location', event.location)
      .field('center', event.center)
      .field('eventType', event.eventType = 'others')
      .then((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('event type is required!!!');
      });
  });
});

describe('/put a event', () => {
  it('it should update a event', () => {
    chai.request(app)
      .put(`/events/${center.id}`)
      .set('x-access-token', token)
      .field('location', event.location = 'oyo')
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('success');
        res.body.should.have.property('updatedEvent');
      });
  });

  it('it should not update a event', () => {
    chai.request(app)
      .put(`/events/${0}`)
      .set('x-access-token', token)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('event not found');
      });
  });
});

// Delete an event
describe('/Delete an event', () => {
  // DELETE a center
  it('it should delete an event', () => {
    chai.request(app)
      .delete(`/events/${event.id}`)
      .set('x-access-token', token)
      .then((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('event deleted');
      });
  });
  it('it should not delete a event', () => {
    chai.request(app)
      .delete(`/events/${0}`)
      .set('x-access-token', token)
      .then((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('event not found');
      });
  });
});
