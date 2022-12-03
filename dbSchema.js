const mongoose = require('mongoose');
const validator = require('validator');

// var productSchema = new mongoose.Schema({
//     id:{type:'string',required:true},
//     product_name:{type:'string',required:true},
//     product_price:{type:"Number",required:true},
//     product_material:{type:'string',required:true},
//     product_color:{type:'string',default:'Purpose of loan'}
// })

// var theatreSchema = new mongoose.Schema({
//     id:{type:'number',required:true},
//     theatre_name:{type:'string',required:true},
//     theatre_detail:{type:"string",required:true},
//     created_date:{type:Date,default:Date.now()},
//     updated_date:{type:'string',default:''},
//     place:{type:"string",required:true}
// })

// var filmSchema = new mongoose.Schema({
//     film_id:{type:'number',required:true},
//     film_name:{type:'string',required:true},
//     film_details:{type:"string",required:true},
//     created_date:{type:Date,default:Date.now()},
//     updated_date:{type:'string',default:''}
// })

// var showSchema = new mongoose.Schema({
//     show_id:{type:'number',required:true},
//     theatre_id:{type:'number',required:true},
//     film_id:{type:'number',required:true},
//     start_time:{type:"string",required:true},
//     end_time:{type:"string",required:true},
//     release_date:{type:"string",required:true},
//     duration:{type:"string",required:true},
//     created_date:{type:Date,default:Date.now()},
// })
var categorySchema = new mongoose.Schema({
    category_name:{type:'string',required:true},
})

var orderSchema = new mongoose.Schema({
    order_token:{type:'string',required:true},
    created_date:{type:Date,default:new Date()},
    order_status:{type:'string',required:true},
    order_total:{type:'number',required:true}
})

var orderProductSchema = new mongoose.Schema({
    order_token:{type:'string',required:true},
    product_name:{type:'string',required:true},
    product_qty:{type:'number',required:true},
    product_price:{type:'number',required:true},
    totalPrice:{type:'number',required:true}
})
// var productRequest = mongoose.model('products',productSchema);
// var theatreSchem = mongoose.model('theatre',theatreSchema);
// var filmSchem = mongoose.model('films',filmSchema);
// var showSchem = mongoose.model('shows',showSchema);
var catSchem = mongoose.model('category_master',categorySchema)
var orderSchem = mongoose.model('order_master',orderSchema)
var orderProSchem = mongoose.model('order_product_master',orderProductSchema)

module.exports={catSchem,orderSchem,orderProSchem,mongoose}