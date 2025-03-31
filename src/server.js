const { render } = require('ejs')
const express = require('express') // commonjs

const path = require('path')
require('dotenv').config()
// import express from 'express'; // es modules
const app = express() // app express
const port = process.env.PORT || 8081// port
const hostname = process.env.HOSTNAME


//config template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
//khai bao route

app.get('/', (req, res) => {
    res.send('Hello World!\n I am Dat!')
})

app.get('/dat2k4', (req, res) => {
    // res.send('Hello World!\n check abc')
    res.render('sample.ejs')
})


app.get('/test', (req, res) => {
    res.send('<h1>Post and Telecomunication Institute of Technology</h1>')
})

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})