var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl,MongoClient} = require('../db');
const {showSchem,mongoose} = require('../dbSchema');
var client = new MongoClient(dbUrl);
const {createToken, decodeToken, validity} = require('../auth')

mongoose.connect(dbUrl);
/* GET home page. */


  /** check if time exist in timeslot */
  // function inTime(date,starttime,endtime,req){
  //   // The producing code (this may take some time)
  //     var dtarr = date.split(':');
  //     var arr = starttime.split(':')
  //     var arr2 = endtime.split(':')
  //     var start = arr[0] * 60 + parseInt(arr[1]);
  //     var end = arr2[0] * 60 + parseInt(arr2[1]);
  //     const now = parseInt(dtarr[0]) * 60 + parseInt(dtarr[1]);
  //     if(start <= now && now <= end){
  //       return true
  //     }
  //     else
  //     {
  //       return false
  //     }
  // }
// create theatre
// router.post('/create', async function(req, res, next) {
//     try {
//       let users;
//       let shows = await showSchem.find().sort({'_id':-1}).limit(1)
//       let addflag = false;
//         if(shows.length > 0){
//           var temp = shows.filter(rec => rec.theatre_id == req.body.theatre_id);
//           if(temp.length > 0){
//             temp.forEach(val =>{
//               console.log(val)
//               const dt = new Date(val.release_date)
//               const dt2 = new Date(req.body.release_date)
//                 var numWeeks = val.duration.split(' ')[0]
//                 const dt3 = new Date(val.release_date);
//                 dt3.setDate(dt3.getDate() + numWeeks * 7);
//                 const weekdate = dt3;
//                 const slotsflag = inTime(req.body.start_time,val.start_time,val.end_time,req)
//                 if(dt.getDate() <= dt2.getDate() && dt3.getDate() >= dt2.getDate() && slotsflag){
//                   addflag = false;
//                   res.send({
//                     statusCode:200,
//                     message:"time slot already existed for the duration week!",
//                   })
                  
//                 }
//                 else{
//                   addflag = true;
//                 }
//             })
//             if(addflag){
//               users =  await showSchem.create(req.body)
//               res.send({
//                 statusCode:200,
//                 message:"show created Successfully!",
//                 users
//               })
//             }
//           }
//           else
//           {
//              users = await showSchem.create(req.body)
//              res.send({
//               statusCode:200,
//               message:"show created Successfully!",
//               users
//             })
//           }
//         }
//         else
//         {
//            users = await showSchem.create(req.body)
//            res.send({
//             statusCode:200,
//             message:"show created Successfully!",
//             users
//           })
//         }

        
//     } catch (error) {
//       console.log(error)
//       res.send({
//         statusCode:500,
//         message:"Internal server error"
//       })
//     }
//   });
// /* GET all theatres page. */
// router.get('/fetchshows',validity, async function(req, res, next) {
//   try {
//     let users = await showSchem.find()
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


//   /**delete theatre */

// router.delete('/delete/:id',validity, async function(req, res, next) {
//     try{
//         let request = await showSchem.deleteOne({ show_id: req.params.id });
//         res.send({
//           status:res.statusCode,
//           data:request
//         })
//     }
//     catch(error){
//       res.send({status:res.statusCode,message:error})
//     }
//   });

  
// /**get  all films and timings based on theatres */
// router.post('/showAll',validity, async (req, res,)=> {
//     await client.connect();
//     try {
//       const db = await client.db('productsServer');
//       let resp = await db.collection('shows').find({"theatre_id":req.body.theatre_id}).toArray()
//         let id = resp.map(rec => rec.film_id);
//         let films = await db.collection('films').find({ "film_id": { $in: id } }).toArray()
//         if(id.length > 0){
//             films.forEach(val1 =>{
//                 resp.forEach(val2 =>{
//                     if(val1.film_id === val2.film_id){
//                         val1.timings = val2.show_timings;
//                     }
//                 })
//             })
//         }
//         res.send({
//           statusCode:res.statusCode,
//           data:films
//         })
//     } catch (error) {
//       console.log(error)
//       res.send({
//         statusCode:500,
//         message:"Internal server error"
//       })
//     }
//     finally{
//       client.close()
//     }
//   });


module.exports = router;
