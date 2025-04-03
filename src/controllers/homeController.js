const connection = require('../config/database');
const getHomepage = (req, res) => {

    //process data

    //call model
    let users = [];
    connection.query(
        'select * from Users',
        function (err, results, fields) {
            users = results;
            console.log("results: ", results);
            // console.log("fields: ", fields);
            console.log("check users: ", users);
            res.send(JSON.stringify(users));
        }
    )


}

const getTest = (req, res) => {
    res.send('<h1>Post and Telecomunication Institute of Technology</h1>')
}

const getDat2k4 = (req, res) => {
    res.render('sample.ejs');
}

module.exports = {
    getHomepage,
    getTest,
    getDat2k4
}