const express = require('express');
const routes = require('./route/index');
if(require('dotenv').config().error){
    throw result.error
}

const PORT = process.env.PORT || 1313;
const ENV = process.env.NODE_ENV || 'local';
const APPNAME = require('./package.json').name;

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.listen(PORT, () => {
    console.log('*********************************************************');
    console.log(`* Starting ${APPNAME} on port: ${PORT}`);
    console.log(`* App Name: ${APPNAME}`);
    console.log(`* Running in: ${ENV}`);
    console.log('*********************************************************');
  });

module.exports = app;
