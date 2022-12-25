const express = require('express');
const app = express();
const config = require('./config/serverConfig');


const prepareAndStartServer = () =>{
    app.listen(config.PORT, ()=>{
        console.log(`server has started on Port:${config.PORT}!`);
    })
}

prepareAndStartServer();