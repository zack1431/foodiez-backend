const mongodb = require('mongodb');
const dbName = 'foodies';
const dbUrl = 'mongodb+srv://zakir:zakir1431@cluster0.dwmosph.mongodb.net/foodies';
const MongoClient = mongodb.MongoClient

module.exports = {mongodb,dbName,dbUrl,MongoClient}