const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require ('chai-http');
const app = require('./../server/server');
const should = chai.should();

chai.use(chaiHttp);

//Test for /Get route
describe('/GET centers', () => {
    
    //test for Get all Events
    it('it should GET all the centers', (done) => {
        chai.request(app)
        .get('/api/centers')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('centers');
            res.body.centers.should.be.a('array').with.lengthOf(2);
            res.body.should.have.property('error');
            res.body.error.should.eql(false);
            done();
        });
    })
});

//POST centers
describe('/POST a center', () =>{
    //Test for post with an existing Id
    it ('it should not POST a center with an existing id field',(done) =>{
        const center =  {
            "id" : 2,
            "name": "Oriental",
            "cost" : "150,000"
        }
    
      chai.request(app)
        .post('/api/centers')
        .send(center)
        .end((err, res) =>{
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('center id already existing');
            res.body.should.have.property('error');
            res.body.error.should.eql(true);
            done();
        })
    })

    //Test for post with no Id
    it ('it should not POST a center without an id field',(done) =>{
        const center =  {
            "name": "Oriental",
            "cost" : "150,000"
        }
      chai.request(app)
        .post('/api/centers')
        .send(center)
        .end((err, res) =>{
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('center id is required');
            res.body.should.have.property('error');
            res.body.error.should.eql(true);
            done();
        })
    })
    
    //Test for post with to add a new center.
    it ('it should Add(post) a new center',(done) =>{
        const center =  {
            "id" : 3,
            "name": "Oriental",
            "cost" : "150,000"
        }
    
      chai.request(app)
        .post('/api/centers')
        .send(center)
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

//GET a center
describe('/Get a center', () =>{
    //GET a center with an Id
    it ('it should get a center',(done) =>{
    const centerId = 2;
      chai.request(app)
        .get('/api/centers/' +centerId)
        .end((err, res) =>{
            res.body.should.be.a('object');
            res.body.should.have.property('center');
            res.body.center.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Success');
            res.body.should.have.property('error');
            res.body.error.should.eql(false);
            done();
        })
    })

    //GET a center got no id
    it ('it should get a center',(done) =>{
        const centerId = 4;
        chai.request(app)
        .get('/api/centers/' +centerId)
        .end((err, res) =>{
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('center not found');
            res.body.should.have.property('error');
            res.body.error.should.eql(true);
            done();
        })
    })
})

//PUT(Update) a center
describe('/Update a center', () =>{
    //PUT a center
    it ('it should update the center',(done) =>{
    const centerId = 2;
      chai.request(app)
        .put('/api/centers/' +centerId)
        .end((err, res) =>{
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('Update Successful');
            res.body.should.have.property('error');
            res.body.error.should.eql(false);
            done();
        })
    })

    // PUT a center 
    it ('it should get an not update',(done) =>{
        const centerId = 4;
        chai.request(app)
        .get('/api/centers/' +centerId)
        .end((err, res) =>{
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('center not found');
            res.body.should.have.property('error');
            res.body.error.should.eql(true);
            done();
        })
    })
}) 

//Delete a center
describe('/Delete an event', () =>{
    //DELETE a center
    it ('it should delete an center',(done) =>{
    const centerId = 2;
      chai.request(app)
        .delete('/api/centers/' +centerId)
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
    it ('it should not delete the center',(done) =>{
        const centerId = 4;
        chai.request(app)
        .delete('/api/centers/' +centerId)
        .end((err, res) =>{
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.eql('center not found');
            res.body.should.have.property('error');
            res.body.error.should.eql(true);
            done();
        })
    })
}) 