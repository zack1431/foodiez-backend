var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl,MongoClient} = require('../db');
const {productRequest,mongoose} = require('../dbSchema');
var client = new MongoClient(dbUrl);
const {createToken, decodeToken, validity} = require('../auth')

mongoose.connect(dbUrl);
/* GET home page. */
router.post('/login', async function(req, res, next) {
  try {
    let token = await createToken(req.body.email)
    let decode = decodeToken(token);
    res.send({
      data:token,
      decodedToken:decode
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});


module.exports = router;
