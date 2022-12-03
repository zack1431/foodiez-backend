var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl,MongoClient} = require('../db');
const {productRequest,theatreSchem,mongoose} = require('../dbSchema');
var client = new MongoClient(dbUrl);
const {createToken, decodeToken, validity} = require('../auth')

mongoose.connect(dbUrl);
/* GET home page. */
// router.post('/login', async function(req, res, next) {
//   try {
//     let token = await createToken(req.body.email)
//     let decode = decodeToken(token);
//     res.send({
//       data:token,
//       decodedToken:decode
//     })
//   } catch (error) {
//     res.send({
//       statusCode:500,
//       message:"Internal server error"
//     })
//   }
// });
// // create theatre
// router.post('/create', async function(req, res, next) {
//     try {
//         let users = await theatreSchem.create(req.body)

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
// /* GET all theatres page. */
// router.get('/fetchTheatres',validity, async function(req, res, next) {
//   try {
//     let users = await theatreSchem.find()
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

// //edit theatre 
// router.put('/edit/:id',validity, async function(req, res, next) {
//     try {
//         let request = await theatreSchem.updateOne({ id: req.params.id },req.body);
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

//   /**delete theatre */

// router.delete('/delete/:id',validity, async function(req, res, next) {
//     try{
//         let request = await theatreSchem.deleteOne({ id: req.params.id });
//         res.send({
//           status:res.statusCode,
//           data:request
//         })
//     }
//     catch(error){
//       res.send({status:res.statusCode,message:error})
//     }
//   });
// /**
//  * delete product with duplicate product price
//  */
// router.delete('/deleteSame', async (req, res,)=> {
//   await client.connect();
//   try {
//     const db = await client.db('productsServer');
//     let resp = await productRequest.find({},{id:0,product_material:0,product_color:0,product_name:0})
//     const dupsRecord = resp.map((item) => item.product_price)
//     const toFindDuplicates =  dupsRecord.filter((item, index) => dupsRecord.indexOf(item) !== index)
//     if(toFindDuplicates.length > 0){
//       let users = await productRequest.deleteMany({ product_price: { $in: toFindDuplicates } })
    
//       res.send({
//         statusCode:res.statusCode,
//         users
//       })
//     }
//     else
//     {
//       res.send({
//         statusCode:res.statusCode,
//         'Message':'No Duplicates Found!!!'
//       })
//     }
//   } catch (error) {
//     console.log(error)
//     res.send({
//       statusCode:500,
//       message:"Internal server error"
//     })
//   }
//   finally{
//     client.close()
//   }
// });


module.exports = router;
