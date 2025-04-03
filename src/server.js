const { render } = require('ejs')
const express = require('express') // commonjs
const configViewEngine = require('./config/viewEngine');
require('dotenv').config()
const webRoutes = require('./routes/web');
const connection = require('./config/database');

const app = express() // app express
const port = process.env.PORT || 8081// port
const hostname = process.env.HOSTNAME


//config template engine
configViewEngine(app);


//khai bao route
app.use('/', webRoutes); 


//test connection


connection.query (
    'select * from Users',
    function(err, results, fields) {
        console.log("results: ", results);
        // console.log("fields: ", fields);
    }
)

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})