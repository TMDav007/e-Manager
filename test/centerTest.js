const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require ('chai-http');
const app = require('./../server/app');
const should = chai.should();

chai.use(chaiHttp);
