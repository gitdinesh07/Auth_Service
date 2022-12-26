const express = require('express');
const config = require('./config/serverConfig');
const bodyParser = require('body-parser');
const apiRoutes = require('../src/routes/index');

const app = express();
const prepareAndStartServer = () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(config.PORT, async ()=>{
        console.log(`server has started on Port:${config.PORT}!`);
    })
}

prepareAndStartServer();