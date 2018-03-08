const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require ('chai-http');
const app = require('./../server/server');
const should = chai.should();

chai.use(chaiHttp);