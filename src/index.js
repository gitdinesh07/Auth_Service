const express = require('express');
const config = require('./config/serverConfig');
const bodyParser = require('body-parser');
const apiRoutes = require('../src/routes/index');

//for test
const db = require('./models/index');
const userService = require('../src/services/user-service');

//
const app = express();
const prepareAndStartServer = () =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api',apiRoutes);

    app.listen(config.PORT, async ()=>{
        console.log(`server has started on Port:${config.PORT}!`);
        //db.sequelize.sync({alter:true});
        var uService = new userService();
        const getValue =await uService.isAdmin(3);
        console.log(getValue);
    })
}

prepareAndStartServer();