import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './../server';
import Model from './../models';

const { User } = Model;

process.env.NODE_ENV = 'test';

/* eslint-disable no-unused-vars */
const should = chai.should();

chai.use(chaiHttp);

const centerName = `lekki-event${Math.random()}`;

describe('Login and checkToken', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done();
    });
  });
});

// Test for sign up
describe('/user ', () => {
  it('it should signup user', (done) => {
    // variable details
    const signUpDetails = {
      name: 'fififi',
      email: `me2you${Math.random()}@yahoo.com `,
      phoneNo: '08095483746',
      password: 'Opeyemi22',
      confirmPassword: 'Opeyemi22',
    };
    chai.request(app)
      .post('/users/')
      .send(signUpDetails)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(true);
        res.body.should.have.property('message');
        res.body.message.should.eql('sign up successful');
        res.body.should.have.property('token');
        done();
      });
  });

  it('it should not signup user', (done) => {
    // variable details
    const signUpDetails = {
      name: '',
      email: 'me2you@yahoo.com',
      phoneNo: '0803526578',
      password: 'opeyemi'
    };
    chai.request(app)
      .post('/users')
      .send(signUpDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('name is required');
        done();
      });
  });

  it('it should not signup user with no email', (done) => {
    // variable details
    const signUpDetails = {
      name: 'opeyehbhx',
      email: '',
      phoneNo: '0803526578',
      password: 'opeyemi'
    };
    chai.request(app)
      .post('/users')
      .send(signUpDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('email is required');
        done();
      });
  });

  it('it should not signup user with an empty phone no', (done) => {
    // variable details
    const signUpDetails = {
      name: 'opdhfhjdf',
      email: 'me2you@yahoo.com',
      phoneNo: '',
      password: 'opeyemi'
    };
    chai.request(app)
      .post('/users')
      .send(signUpDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('phone number is required');
        done();
      });
  });

  it('it should not signup user with an invalid phone nunber', (done) => {
    // variable details
    const signUpDetails = {
      name: 'opdhfhjdf',
      email: 'me2you@yahoo.com',
      phoneNo: 'dfg4567777' || '093895979473976597947',
      password: 'opeyemi'
    };
    chai.request(app)
      .post('/users')
      .send(signUpDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('valid phone number required');
        done();
      });
  });

  it('it should not signup user with an unconfirmed password', (done) => {
    // variable details
    const signUpDetails = {
      name: 'fififi',
      email: 'me22you@yahoo.com',
      phoneNo: '09389979947',
      password: 'Opeyemi2',
    };
    chai.request(app)
      .post('/users')
      .send(signUpDetails)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.should.eql('password not confirmed');
        done();
      });
  });
});


// test for login
describe('/login a user', () => {
  it('it should not login with an incorrect email ', (done) => {
    // variable details
    const loginDetails = {
      email: 'meyou@yahoo.com',
      password: 'opeyemi'
    };

    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.eql('email not found');
        done();
      });
  });
});

describe('/login a user', () => {
  it('it should not login with an incorrect password ', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyem'
    };

    // login users details
    chai.request(app)
      .post('/users/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('authentication');
        res.body.authentication.should.eql(false);
        res.body.should.have.property('token');
        done();
      });
  });
});

// POST centers
describe('/POST a center', () => {
  it('it should create a center after authenicating user', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const center = {
      centerName,
      price: '500,000',
      location: 'lagos',
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
          .post('/centers/')
          .set('x-access-token', token)
          .send(center)
          .end((err, res) => {
            res.body.should.be.a('object');
            res.body.should.be.property('message');
            res.body.message.should.eql('center created');
            res.body.should.have.property('center');
            done();
          });
      });
  });

  it('it should not create a center with an existing center name', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const center = {
      centerName: 'lekki-Event',
      price: '500,000',
      location: 'lagos',
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
          .post('/centers/')
          .set('x-access-token', token)
          .send(center)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('center name already existing');
            done();
          });
      });
  });
});

// get a center

describe('/get a center', () => {
  it('it should get a center', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const id = 2;

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
          .get(`/centers/${id}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('success');
            res.body.should.have.property('center');
            done();
          });
      });
  });

  it('it should not get a center', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const id = 0;

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
          .get(`/centers/${id}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('center not found');
            done();
          });
      });
  });
});

// update a center
describe('/put a center', () => {
  it('it should update a center', (done) => {
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
          .put(`/centers/${centerName}`)
          .set('x-access-token', token)
          .send({ location: 'oyo' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('success');
            done();
          });
      });
  });

  it('it should not update a center', (done) => {
    // variable details
    const loginDetails = {
      email: 'me2you@yahoo.com',
      password: 'opeyemi'
    };

    const centerNames = 'orange-evt';

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
          .put(`/centers/${centerNames}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('center not found');
            done();
          });
      });
  });
});

// Delete a center
describe('/Delete a center', () => {
  // DELETE a center
  it('it should delete a center', (done) => {
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
          .delete(`/centers/${centerName}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('center deleted');
            done();
          });
      });
  });

  it('it should not delete a center', (done) => {
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
          .delete(`/centers/${centerName}`)
          .set('x-access-token', token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.eql('center not found');
            done();
          });
      });
  });
});
