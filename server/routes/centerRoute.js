const express = require('express')
const centersController = require('./../controller/centerController')
const centerRouter = express.Router();


//router for the get,post,delte and put
centerRouter.get('/',centersController.getAllCenters)
            .post('/',centersController.addCenter)

centerRouter.put('/:id',centersController.updateCenter)
            .delete('/:id',centersController.removeCenter)
            .get('/:id',centersController.getCenter);

module.exports = centerRouter;