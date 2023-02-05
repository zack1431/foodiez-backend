var express = require('express');
var router = express.Router();
const {mongodb,dbName,dbUrl,MongoClient} = require('../db');
const {catSchem,orderSchem,orderProSchem,mongoose} = require('../dbSchema');
var client = new MongoClient(dbUrl);
const {createToken, decodeToken, validity} = require('../auth')
mongoose.connect(dbUrl);
/* GET all categories page. */
router.get('/categories',validity, async function(req, res, next) {
  try {
    await client.connect();
    const db = await client.db(dbName);
    let resp = await db.collection('category_master').find().toArray()
    res.send({
      statusCode:200,
      resp
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});

router.get('/products',validity, async function(req, res, next) {
    try {
      await client.connect();
      const db = await client.db(dbName);
      let resp = await db.collection('product_master').aggregate([
        { $lookup:
           {
             from: 'category_master',
             localField: 'product_ct_id',
             foreignField: 'ct_id',
             as: 'productDetails'
           },
         },
         {

            $unwind:'$productDetails'
         } ,     
         {
           "$project": {
             "_id": 1,
             "product_name": "$product_name", 
             "product_image": "$product_image",
             "product_description": "$product_description",
             "product_price": "$product_price",
             "category_name":"$productDetails.category_name",
             "product_ct_id":"$product_ct_id"
           }
         }
        ]).sort({"product_name":1}).toArray()
        var dataResp = [...resp]
      res.send({
        statusCode:200,
        dataResp
      })
    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
    }
  });

  router.post('/createOrder',validity, async function(req, res, next) {
    try {
        let order = await orderSchem.create(req.body)
        let lastOrder = await orderSchem.find().sort({_id:-1}).limit(1);
        if(lastOrder.length > 0){
          req.body.productArr = JSON.parse(req.body.productArr)
          req.body.productArr.forEach(val =>{
            val['order_token'] = req.body.order_token
          })
          let orderProduct = await orderProSchem.insertMany(req.body.productArr)
        }
        res.send({
          statusCode:200,
          message:"order created Successfully!",
        })
    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
    }
  });

  /* GET last order page. */
router.get('/lastOrder',validity, async function(req, res, next) {
  try {
    let users = await orderSchem.find().sort({_id:-1}).limit(1);
    res.send({
      statusCode:200,
      users
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
});


  /* GET order page. */
  router.get('/orderlist',validity, async function(req, res, next) {
    try {
      let users = await orderSchem.find().sort({_id:-1});
      res.send({
        statusCode:200,
        users
      })
    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
    }
  });

  /* GET ordered product page. */
  router.post('/productOrder',validity, async function(req, res, next) {
    try {
      let users = await orderProSchem.find({order_token:req.body.order_token});
      res.send({
        statusCode:200,
        users
      })
    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
    }
  });

  /* GET ordered product page. */
  router.post('/updateStatus',validity, async function(req, res, next) {
    try {
      const filter = { order_token: req.body.order_token };
      const update = { order_status: req.body.order_status };
      let users1 = await orderSchem.updateOne(filter, update)
      let users = await orderSchem.find().sort({_id:-1});
      res.send({
        statusCode:200,
        users
      })
    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
    }
  });

  /* GET order page. */
  router.get('/Preparing',validity, async function(req, res, next) {
    try {
      let users = await orderSchem.find({order_status:'Preparing'}).sort({_id:1});
      res.send({
        statusCode:200,
        users
      })
    } catch (error) {
      console.log(error)
      res.send({
        statusCode:500,
        message:"Internal server error"
      })
    }
  });

   /* GET order page. */
   router.get('/totalSales',validity, async function(req, res, next) {
    try {
      await client.connect();
      const db = await client.db('foodies');
      let resp = await db.collection('order_masters').aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$created_date" } 
            },
            total: { $sum: "$order_total" },
            count: { $count:{} }
            
          }
        }
      ]).toArray()
      var monthArr = resp.map(rec => rec._id.month);
      var totalArr = resp.map(rec => rec.total)
      var countArr = resp.map(rec => rec.count);
      totalArr.sort(function(a, b){return a - b})
      monthArr.sort(function(a, b){return a - b})
      countArr.sort(function(a,b){return a - b})
      res.send({
        status:200,
        resp,
        monthArr,
        totalArr,
        countArr
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
