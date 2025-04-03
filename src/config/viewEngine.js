const path = require('path');
const express = require('express');
const configViewEngine = (app) => {
    console.log(__dirname);
    app.set('views', path.join('./src', 'views'))
    app.set('view engine', 'ejs')
    //comfig static file
    app.use(express.static(path.join('./src', 'public')));
}

module.exports = configViewEngine;