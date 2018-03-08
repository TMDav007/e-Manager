const express = require('express')
const centersController = require('./../controller/centerController')
const centerRouter = express.Router();


//router for the get,post,delte and put
centerRouter.get('/',centersController.getAllCenters)
            .post('/',centersController.addCenter)

centerRouter.put('/:centerId',centersController.updateCenter)
            .delete('/:centerId',centersController.removeCenter)
            .get('/:centerId',centersController.getCenter);

module.exports = centerRouter;