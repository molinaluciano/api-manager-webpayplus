const axios = require('axios');
if(require('dotenv').config().error){
    throw result.error
}

const environment = process.env.NODE_ENV || 'local';
const config = require(`../config/environment/${environment}.config`);

const instance = axios.create({
    baseURL: config.urls.transbankUrl
  });

function createTransaction(Transaction){

}