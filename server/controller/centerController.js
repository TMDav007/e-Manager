const center = require('./../model/centerModel');

const getAllCenters =(req, res) => {
    if (center.length > 0)
     {
         return res.json({
             centers: center,
             error : false
        });
     }
     return res.json({
         message: "No center",
         error : true
    });
};

//the addCenter method
const addCenter = (req, res) => {
    //check if the id is not existing
    for (let i= 0; i<center.length; i++){
        if (req.body.id === center[i].id){
           return res.json({
                message: "center id already existing",
                error: true
            });
        }
        else if (!req.body.id){
            return res.json({
                message: "center id is required",
                error: true
            });
         }
    } 
        center.push(req.body);
            return res.json({
            message: "Success",
            error: false
           }); 
} 

//updateCenter method
const updateCenter = (req, res) => {
    for (let i= 0; i<center.length; i++){
        if (center[i].id === parseInt(req.params.centerId, 10)){
            center[i].name = req.body.name;
            center[i].cost = req.body.cost;
            return res.json({
                message : 'Update Successful',
                error : false
            });
        }
    }
        return res.status(404).json({
            message: 'center not found',
            error : true
        });
}

//remove center method
const removeCenter = (req, res) =>{
    for (let i = 0; i<center.length ; i++){
        if (center[i].id === parseInt(req.params.centerId)){
            center.splice(i,1);
            return res.json({
                message : "Success",
                error : false
            });
        }
    }
    return res.status(404).json({
        message: 'center not found',
        error : true
    });
}

//getCenter method
const getCenter = (req, res) => {
    for (let i = 0; i<center.length ; i++){
        if (center[i].id === parseInt(req.params.centerId)){
            return res.json({
                center : center[i],
                message : "Success",
                error : false
            });
        }
    }
    return res.status(404).json({
        message: 'center not found',
        error : true
    });      
}

  

 module.exports = { addCenter, getAllCenters, getCenter, removeCenter,updateCenter}