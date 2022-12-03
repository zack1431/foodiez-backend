var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl,MongoClient} = require('../db');
const {filmSchem,mongoose} = require('../dbSchema');
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
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});
// create theatre
// router.post('/create', async function(req, res, next) {
//     try {
//         let users = await filmSchem.create(req.body)

//         res.send({
//           statusCode:200,
//           message:"theatre created Successfully!",
//           users
//         })
//     } catch (error) {
//       console.log(error)
//       res.send({
//         statusCode:500,
//         message:"Internal server error"
//       })
//     }
//   });
/* GET all theatres page. */
// router.get('/fetchFilms',validity, async function(req, res, next) {
//   try {
//     let users = await filmSchem.find()
//     res.send({
//       statusCode:200,
//       users
//     })
//   } catch (error) {
//     console.log(error)
//     res.send({
//       statusCode:500,
//       message:"Internal server error"
//     })
//   }
// });

//edit theatre 
// router.put('/edit/:id',validity, async function(req, res, next) {
//     try {
//         let request = await filmSchem.updateOne({ film_id: req.params.id },req.body);
//         res.send({
//           message:'Success!!!',
//           status:res.statusCode,
//           data:request
//         })
//     } catch (error) {
//       console.log(error)
//       res.send({
//         statusCode:500,
//         message:"Internal server error"
//       })
//     }
//   });

  /**delete theatre */

// router.delete('/delete/:id',validity, async function(req, res, next) {
//     try{
//         let request = await filmSchem.deleteOne({ film_id: req.params.id });
//         res.send({
//           status:res.statusCode,
//           data:request
//         })
//     }
//     catch(error){
//       res.send({status:res.statusCode,message:error})
//     }
//   });


module.exports = router;
