
const express = require ('express');
const app        = express();
const bodyParser = require('body-parser');
const eventsRouter = require("./routes/eventRoute");
const centersRouter = require("./routes/centerRoute");


const port = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.use('/api/events', eventsRouter); 
app.use('/api/centers', centersRouter); 

app.listen(port, ()=>{
    console.log("we are running live");
})

module.exports = app;