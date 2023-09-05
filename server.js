var express = require('express');
var server = express();
var routes = require('./routes/routes');
var mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(MongoDB connection string here, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB Connectedddd!!!!!!!!!!!");
})
.catch((error) => {
    console.error("Error connecting to the database:", error);
});


server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8000,function check(error)
{
    if(error)
    {
        console.log("errorr")
    }
    else
    {
        console.log("startedddddd")
    }
});
