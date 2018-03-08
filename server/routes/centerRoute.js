const express = require('express')
const centersController = require('./../controller/centerController')
const centerRouter = express.Router();


//router for the get
centerRouter.get('/',centersController.getAllCenters);

//add a new center
centerRouter.post('/',centersController.addCenter);

//update a center
centerRouter.put('/:centerId',centersController.updateCenter);

//delete a center
centerRouter.delete('/:centerId',centersController.removeCenter);

//get a center
centerRouter.get('/:centerId',centersController.getCenter);

module.exports = centerRouter;